import { FC } from "react";
import { AccountsGrid } from "@components/AccountsGrid";
import { GetServerSideProps } from "next";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import {
  getRangeByPageNumber,
  MAX_SENSORS_PER_PAGE as MAX_ACCOUNTS_PER_PAGE,
} from "../sensors";
import { Pagination } from "@components/Pagination";
import router from "next/router";
import { getLandingStats } from "@lib/requests/getLandingStats";
import classNames from "classnames";
import { getPublicAccounts } from "@lib/requests/getPublicAccounts";

interface AccountsOverviewPropType {
  accounts: ParsedAccountType[];
  accountsCount: number;
  page: number;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Array.isArray(query.page) ? 1 : Number.parseInt(query.page) || 1;
  const [rangeStart, rangeEnd] = getRangeByPageNumber(page);
  try {
    const accounts = await getPublicAccounts({ rangeStart, rangeEnd });
    const { usersCount: accountsCount } = await getLandingStats();
    return { props: { accounts, accountsCount, page } };
  } catch (error) {
    console.error("Error when fetching accounts:");
    console.error(error);
    return { notFound: true };
  }
};

const handlePageChange = ({
  selectedPage,
  pageCount,
}: {
  selectedPage: number;
  pageCount: number;
}): void => {
  const path = router.pathname;
  const query =
    selectedPage === 1 || selectedPage > pageCount
      ? ""
      : `page=${selectedPage}`;

  void router.push({
    pathname: path,
    query: query,
  });
};

const AccountsOverview: FC<AccountsOverviewPropType> = ({
  accounts,
  accountsCount,
  page,
}) => {
  const pageCount = Math.ceil(accountsCount / MAX_ACCOUNTS_PER_PAGE);
  const pageIsWithinPageCount = page <= pageCount;
  const pageToRender = pageIsWithinPageCount ? page : 1;

  if ((!accounts || accounts.length === 0) && pageIsWithinPageCount)
    return (
      <div className='container mx-auto max-w-8xl py-24 px-4'>
        <h1 className='flex justify-center mt-8'>Keine Accounts vorhanden</h1>
      </div>
    );
  return (
    <div className='container mx-auto max-w-8xl py-24 px-4'>
      <div
        className={classNames(
          "sm:mt-1 md:mt-2",
          "mb-4 sm:mb-5 md:mb-6",
          "flex place-content-between"
        )}
      >
        <h1
          className={[
            "font-bold text-xl sm:text-2xl md:text-3xl font-headline",
          ].join(" ")}
        >
          Alle Accounts
        </h1>
        <h2 className='text-gray-600 mt-0 md:mt-2'>
          Seite {page} von {pageCount}
        </h2>
      </div>
      <AccountsGrid accounts={accounts} />
      <div className='mt-12 flex justify-center'>
        <Pagination
          pageCount={pageCount}
          numberOfDisplayedPages={5}
          marginPagesDisplayed={1}
          currentPage={pageToRender}
          onPageChange={({ selected: selectedIndex }) => {
            handlePageChange({ selectedPage: selectedIndex + 1, pageCount });
          }}
        />
      </div>
    </div>
  );
};

export default AccountsOverview;
