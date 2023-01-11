import { NUMBER_OF_SENSOR_SYMBOLS } from "@components/SensorSymbol";
import { Tabs } from "@components/Tabs";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { AccountWithSensorsType } from "@lib/requests/getAccountDataByUsername";
import { FC } from "react";
import { UserInfoHeader } from ".";

interface UserInfoWithDataPropType {
  routeAccount: AccountWithSensorsType;
  activeTab: "sensors" | "tokens";
  isLoading?: boolean;
  sensors: ParsedSensorType[];
}

export const getRandomSensorId = (): number =>
  Math.round(Math.random() * (NUMBER_OF_SENSOR_SYMBOLS - 1) + 1);

export const UserInfoWithData: FC<UserInfoWithDataPropType> = ({
  routeAccount,
  activeTab,
}) => {
  const username = routeAccount?.username || "#";

  const activeTabIndex = activeTab === "tokens" ? 1 : 0;
  const tabs = [
    {
      id: "sensors",
      name: "Sensoren",
      href: `/${username}/sensors`,
    },
  ];
  return (
    <>
      <div className={`border-b border-gray-200 pt-4`}>
        <div className='container max-w-8xl mx-auto px-4 relative'>
          <UserInfoHeader
            {...routeAccount}
            withEditButton={false}
            onEditButtonClick={() => undefined}
          />
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
            <div className='z-10 translate-y-0.5'>
              <Tabs
                tabPanelId='tab-content'
                activeTabIndex={activeTabIndex}
                tabs={tabs}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
