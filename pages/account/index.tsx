import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserData } from "@lib/hooks/useUserData";
import sensors from "pages/sensors";
import { UserInfoWithData } from "@components/UserInfoHeader/withData";
import { AccountWithSensorsType } from "@lib/requests/getAccountDataByUsername";

const AccountRedirectionPage: FC = () => {
  const { user: loggedInAccount } = useUserData();
  const router = useRouter();

  const loggedOutFakeAccount: AccountWithSensorsType = {
    id: "",
    categories: [],
    username: "...",
    displayName: "Account lädt ...",
    createdAt: "",
    recordsCount: 0,
    sensorsCount: 0,
    sensors: [],
  };

  useEffect(() => {
    if (!loggedInAccount) return;

    void router.replace({
      pathname: "/[username]/sensors",
      query: { username: loggedInAccount.username },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInAccount]);

  return (
    <>
      <UserInfoWithData
        routeAccount={loggedOutFakeAccount}
        activeTab='sensors'
      />
      <div
        id='tab-content'
        role='tabpanel'
        className={[
          "container max-w-8xl mx-auto px-4 pt-8 pb-24 min-h-[500px]",
          sensors.length === 0
            ? "flex place-items-center place-content-center"
            : "",
        ].join(" ")}
      >
        <div className='text-gray-500 text-center mt-12'>Account lädt ...</div>
      </div>
    </>
  );
};

export default AccountRedirectionPage;
