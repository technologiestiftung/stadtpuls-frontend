import { FC } from "react";
import { AccountsGrid } from "@components/AccountsGrid";
import { GetServerSideProps } from "next";
import {
  getPublicAccounts,
  PublicAccountType,
  usePublicAccounts,
} from "@lib/hooks/usePublicAccounts";
import { Alert } from "@components/Alert";

interface AccountsOverviewPropType {
  initialAccounts: PublicAccountType[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialAccounts = await getPublicAccounts();
    return { props: { initialAccounts } };
  } catch (error) {
    console.error("Error when fetching accounts:");
    console.error(error);
    return { notFound: true };
  }
};

const AccountsOverview: FC<AccountsOverviewPropType> = ({
  initialAccounts,
}) => {
  const { accounts, error } = usePublicAccounts(initialAccounts);
  if (error)
    return (
      <div className='container mx-auto max-w-8xl py-24 px-4'>
        <Alert
          title='Fehler'
          message={
            <>
              Es ist ein Fehler beim Laden der Accounts aufgetreten.
              <code className='ml-4 px-2 py-1 font-mono bg-error bg-opacity-20'>
                {error.message}
              </code>
            </>
          }
        />
      </div>
    );
  if (accounts.length === 0)
    return (
      <div className='container mx-auto max-w-8xl py-24 px-4'>
        <h1 className='flex justify-center mt-8'>Keine Accounts vorhanden</h1>
      </div>
    );
  return (
    <div className='container mx-auto max-w-8xl py-24 px-4'>
      <h1
        className={[
          "font-bold text-xl sm:text-2xl md:text-3xl font-headline",
          "sm:mt-1 md:mt-2",
          "mb-4 sm:mb-5 md:mb-6",
        ].join(" ")}
      >
        Alle Accounts
      </h1>
      <AccountsGrid accounts={accounts} />
    </div>
  );
};

export default AccountsOverview;
