import {
  AccountWithSensorsType,
  getAccountDataByUsername,
} from "@lib/requests/getAccountDataByUsername";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { getPublicAccounts } from "@lib/requests/getPublicAccounts";
import { useRouter } from "next/router";
import { SensorsListRow } from "@components/SensorsListRow";
import { SensorsListRowLoadingSkeleton } from "@components/SensorsListRowLoadingSkeleton";
import { parseSensorRecords } from "@lib/hooks/usePublicSensors";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const username = params?.username;
    if (!username || Array.isArray(username)) return { notFound: true };
    const account = await getAccountDataByUsername(username);

    if (!account) return { notFound: true };
    return {
      props: { account: account || null, error: null },
      revalidate: 30,
    };
  } catch (error) {
    console.error(JSON.stringify(error));
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { accounts } = await getPublicAccounts();
  return {
    paths: accounts.map(({ username }) => ({ params: { username } })),
    fallback: true,
  };
};

interface AccountSensorsPagePropType {
  account: AccountWithSensorsType;
}

const AccountSensorsPage: FC<AccountSensorsPagePropType> = ({ account }) => {
  const { isFallback } = useRouter();

  const sensorsToDisplay = (account.sensors || []).map(sensor => ({
    ...sensor,
    parsedRecords: parseSensorRecords(sensor.parsedRecords),
  }));
  return (
    <>
      <UserInfoWithData
        routeAccount={account}
        sensors={sensorsToDisplay}
        isLoading={isFallback || !account}
        activeTab='sensors'
      />
      <div
        id='tab-content'
        role='tabpanel'
        className={[
          "container max-w-8xl mx-auto px-4 pt-8 pb-24 min-h-[500px]",
          account?.sensors.length === 0
            ? "flex place-items-center place-content-center"
            : "",
        ].join(" ")}
      >
        {(isFallback || sensorsToDisplay.length > 0) && (
          <ul className='flex flex-col w-[calc(100%+16px)] ml-[-8px]'>
            {isFallback
              ? Array.from({ length: 10 }).map((_, i) => (
                  <SensorsListRowLoadingSkeleton key={i} />
                ))
              : sensorsToDisplay.map(sensor => (
                  <SensorsListRow
                    {...sensor}
                    parsedRecords={sensor.parsedRecords}
                    key={sensor.id}
                  />
                ))}
          </ul>
        )}
        {!isFallback && sensorsToDisplay.length === 0 && (
          <p>Keine Sensoren vorhanden</p>
        )}
      </div>
    </>
  );
};

export default AccountSensorsPage;
