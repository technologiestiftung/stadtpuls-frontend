import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { useUserData } from "@lib/hooks/useUserData";
import { TextLink } from "@components/TextLink";
import { Alert } from "@components/Alert";

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const username = context.query.username;
    if (!username || Array.isArray(username)) return { notFound: true };

    const routeAccount = await getAccountDataByUsername(username);
    return { props: { routeAccount, error: null } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

interface AccountTokensPagePropType {
  routeAccount: ParsedAccountType;
}

const AccountTokensPage: FC<AccountTokensPagePropType> = ({ routeAccount }) => {
  const { isLoggedIn, user: loggedInAccount } = useUserData();
  const account =
    loggedInAccount?.username === routeAccount?.username
      ? loggedInAccount
      : routeAccount;
  const isOwnerAndLoggedIn =
    isLoggedIn && loggedInAccount?.username === routeAccount.username;
  return (
    <>
      <UserInfoWithData routeAccount={account} activeTab='tokens' />
      {!isOwnerAndLoggedIn && (
        <div
          className='container max-w-8xl mx-auto px-4 py-8'
          id='tab-content'
          role='tabpanel'
        >
          <Alert
            type='warning'
            title='Du bist nicht eingeloggt!'
            message={
              <span className='flex gap-4'>
                Du kannst hier nur deine Tokens sehen wenn du eingeloggt bist
                <TextLink href='/login'>Einloggen</TextLink>
              </span>
            }
          />
        </div>
      )}
    </>
  );
};

export default AccountTokensPage;
