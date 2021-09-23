import { definitions } from "@common/types/supabase";
import { UserInfoHeader } from "@components/UserInfoHeader";
import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { GetServerSideProps } from "next";
import { FC } from "react";

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
  account: definitions["user_profiles"];
}

const AccountSensorsPage: FC<AccountSensorsPagePropType> = ({ account }) => {
  console.log(account);
  return (
    <>
      <UserInfoHeader
        username={account.name || ""}
        displayName={account.display_name || ""}
        link={account.url}
        description={account.description}
        sensorsCount={0}
        recordsCount={0}
      />
    </>
  );
};

export default AccountSensorsPage;
