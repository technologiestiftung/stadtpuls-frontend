import { FC } from "react";
import { AccountsGrid } from "@components/AccountsGrid";
import { GetServerSideProps } from "next";
import {
  getPublicAccounts,
  PublicAccountType,
} from "@lib/hooks/usePublicAccounts";

interface AccountsOverviewPropType {
  accountsData: {
    count: number;
    accounts: PublicAccountType[];
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const accountsData = await getPublicAccounts();
    return { props: { accountsData } };
  } catch (error) {
    console.error("Error when fetching accounts:");
    console.error(error);
    return { notFound: true };
  }
};

const AccountsOverview: FC<AccountsOverviewPropType> = ({ accountsData }) => {
  if (!accountsData || accountsData.accounts.length === 0)
    return (
      <h1 className='flex justify-center mt-8'>Keine Accounts vorhanden</h1>
    );
  return (
    <div className='container mx-auto max-w-8xl py-24 px-4'>
      <AccountsGrid accounts={accountsData.accounts} />
    </div>
  );
};

export default AccountsOverview;