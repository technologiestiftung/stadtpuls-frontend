import {
  AccountWithSensorsType,
  getAccountDataByUsername,
} from "@lib/requests/getAccountDataByUsername";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { SensorsList } from "@components/SensorsList";

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const username = context.query.username;
    if (!username || Array.isArray(username)) return { notFound: true };
    const accountData = await getAccountDataByUsername(username);
    return {
      props: {
        account: { ...accountData },
        error: null,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

interface AccountSensorsPagePropType {
  account: AccountWithSensorsType;
}

const AccountSensorsPage: FC<AccountSensorsPagePropType> = ({ account }) => {
  return (
    <>
      <UserInfoWithData routeAccount={account} activeTab='sensors' />
      <div
        id='tab-content'
        role='tabpanel'
        className={[
          "container max-w-8xl mx-auto px-4 pt-8 pb-24 min-h-[500px]",
          account.sensors.length === 0
            ? "flex place-items-center place-content-center"
            : "",
        ].join(" ")}
      >
        {account.sensors.length > 0 ? (
          <SensorsList sensors={account.sensors} showAuthorNames={false} />
        ) : (
          <p>Keine Sensoren vorhanden</p>
        )}
      </div>
    </>
  );
};

export default AccountSensorsPage;
