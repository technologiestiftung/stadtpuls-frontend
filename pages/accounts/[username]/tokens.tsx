import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { PublicAccountType } from "@lib/hooks/usePublicAccounts";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";

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
  console.log(account);
  return (
    <>
      <UserInfoWithData initialAccount={account} activeTabIndex={1} />
    </>
  );
};

export default AccountTokensPage;
