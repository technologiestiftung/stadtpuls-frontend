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

interface AccountSensorsPagePropType {
  account: PublicAccountType;
}

const AccountSensorsPage: FC<AccountSensorsPagePropType> = ({ account }) => (
  <>
    <UserInfoWithData initialAccount={account} activeTab='sensors' />
  </>
);

export default AccountSensorsPage;
