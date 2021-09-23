import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { PublicAccountType } from "@lib/hooks/usePublicAccounts";
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

    const accountData = await getAccountDataByUsername(username);
    return { props: { account: { ...accountData, username }, error: null } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

interface AccountTokensPagePropType {
  account: PublicAccountType;
}

const AccountTokensPage: FC<AccountTokensPagePropType> = ({ account }) => {
  const { user } = useUserData();
  const isOwnerAndLoggedIn = !!user && user.name === account.username;
  return (
    <>
      <UserInfoWithData initialAccount={account} activeTab='tokens' />
      {!isOwnerAndLoggedIn && (
        <div className='container max-w-8xl mx-auto px-4 py-8'>
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
