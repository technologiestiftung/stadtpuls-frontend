import { getAccountDataByUsername } from "@lib/requests/getAccountDataByUsername";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { SensorsGrid } from "@components/SensorsGrid";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { fetchUserSensors, useUserData } from "@lib/hooks/useUserData";

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const username = context.query.username;
    if (!username || Array.isArray(username)) return { notFound: true };

    const accountData = await getAccountDataByUsername(username);
    const sensorsData = await fetchUserSensors(accountData.id, false);
    return {
      props: {
        account: { ...accountData, username },
        sensors: sensorsData || [],
        error: null,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

interface AccountSensorsPagePropType {
  account: ParsedAccountType;
  sensors: ParsedSensorType[];
}

const AccountSensorsPage: FC<AccountSensorsPagePropType> = ({
  account,
  sensors: initialSensors,
}) => {
  const { isLoggedIn, sensors: sensorsData } = useUserData({
    sensors: initialSensors,
  });
  const sensors = isLoggedIn ? sensorsData || [] : initialSensors;
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
          <SensorsGrid sensors={sensors} showAuthorNames={false} />
        ) : (
          <p>Keine Sensoren vorhanden</p>
        )}
      </div>
    </>
  );
};

export default AccountSensorsPage;
