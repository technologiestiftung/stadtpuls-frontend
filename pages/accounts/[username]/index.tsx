import { UserInfoHeader } from "@components/UserInfoHeader";
import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { PublicAccountType } from "@lib/hooks/usePublicAccounts";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { Tabs } from "@components/Tabs";

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
        <div className='container max-w-8xl mx-auto px-4 relative'>
          <UserInfoHeader {...account} />
          <div className='absolute left-0 bottom-[-1px] z-10'>
            <Tabs
              activeTabIndex={0}
              tabs={[
                { id: "sensors", name: "Sensoren" },
                { id: "tokens", name: "Tokens" },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSensorsPage;
