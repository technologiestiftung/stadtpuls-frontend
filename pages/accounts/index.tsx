import { FC } from "react";
import { AccountsGrid } from "@components/AccountsGrid";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import classNames from "classnames";
import { GetStaticProps } from "next";
import { getPublicAccounts } from "@lib/requests/getPublicAccounts";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { accounts } = await getPublicAccounts();
    return { props: { accounts, error: null } };
  } catch (error) {
    console.error(JSON.stringify(error));
    return { notFound: true };
  }
};

const AccountsOverview: FC<{
  accounts: ParsedAccountType[];
}> = ({ accounts }) => {
  if (!accounts || accounts.length === 0)
    return (
      <div className='container mx-auto max-w-8xl pt-12 pb-24 px-4'>
        <h1 className='flex justify-center mt-8'>Keine Accounts vorhanden</h1>
      </div>
    );
  return (
    <div className='container mx-auto max-w-8xl pt-12 pb-24 px-4'>
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
      </div>
      <AccountsGrid isLoading={false} accounts={accounts} />
    </div>
  );
};

export default AccountsOverview;
