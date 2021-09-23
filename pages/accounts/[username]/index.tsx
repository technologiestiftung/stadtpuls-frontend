import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { PublicAccountType } from "@lib/hooks/usePublicAccounts";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { SensorsGrid } from "@components/SensorsGrid";
import {
  getPublicSensors,
  PublicSensorType,
  usePublicSensors,
} from "@lib/hooks/usePublicSensors";

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const username = context.query.username;
    if (!username || Array.isArray(username)) return { notFound: true };

    const accountData = await getAccountDataByUsername(username);
    const sensorsData = await getPublicSensors();
    return {
      props: {
        account: { ...accountData, username },
        sensorsData,
        error: null,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

interface AccountSensorsPagePropType {
  account: PublicAccountType;
  sensorsData: {
    sensors: PublicSensorType[];
    count: number;
  };
}

const AccountSensorsPage: FC<AccountSensorsPagePropType> = ({
  account,
  sensorsData: initialSensorsData,
}) => {
  const { data: sensorsData } = usePublicSensors({
    initialData: initialSensorsData,
  });
  const sensors = (sensorsData ? sensorsData.sensors : []).filter(
    ({ user_id }) => user_id === account.id
  );
  return (
    <>
      <UserInfoWithData initialAccount={account} activeTab='sensors' />
      <div
        className={[
          "container max-w-8xl mx-auto px-4 pt-8 pb-24 min-h-[500px]",
          sensors.length === 0
            ? "flex place-items-center place-content-center"
            : "",
        ].join(" ")}
      >
        {sensors.length > 0 ? (
          <SensorsGrid sensors={sensors} />
        ) : (
          <p>Keine Sensoren vorhanden</p>
        )}
      </div>
    </>
  );
};

export default AccountSensorsPage;
