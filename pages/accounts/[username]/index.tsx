import { UserInfoHeader } from "@components/UserInfoHeader";
import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { PublicAccountType } from "@lib/hooks/usePublicAccounts";
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
  account: PublicAccountType;
}

const AccountSensorsPage: FC<AccountSensorsPagePropType> = ({ account }) => {
  console.log(account);
  return (
    <>
      <div className='border-b border-gray-200 pt-8'>
        <div className='container max-w-8xl mx-auto px-4'>
          <UserInfoHeader {...account} />
        </div>
      </div>
    </>
  );
};

export default AccountSensorsPage;
