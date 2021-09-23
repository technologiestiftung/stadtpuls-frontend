import { Tabs } from "@components/Tabs";
import { PublicAccountType } from "@lib/hooks/usePublicAccounts";
// import { useUserData } from "@lib/hooks/useUserData";
import { FC } from "react";
import { UserInfoHeader } from ".";

interface UserInfoWithDataPropType {
  initialAccount: PublicAccountType;
  activeTab: "sensors" | "tokens";
}

export const UserInfoWithData: FC<UserInfoWithDataPropType> = ({
  initialAccount,
  activeTab,
}) => {
  // const { user } = useUserData();
  const user = { name: "vogelino" }; // FIXME: Replace with line above
  const isOwnerAndLoggedIn = !!user && user.name === initialAccount.username;
  const activeTabIndex = activeTab === "tokens" ? 1 : 0;
  const tabs = [
    {
      id: "sensors",
      name: "Sensoren",
      href: `/accounts/${initialAccount.username}`,
    },
  ];
  if (isOwnerAndLoggedIn || activeTab === "tokens") {
    tabs.push({
      id: "tokens",
      name: "Tokens",
      href: `/accounts/${initialAccount.username}/tokens`,
    });
  }
  return (
    <div className='border-b border-gray-200 pt-8'>
      <div className='container max-w-8xl mx-auto px-4 relative'>
        <UserInfoHeader
          {...initialAccount}
          withEditButton={isOwnerAndLoggedIn}
        />
        <div className='absolute left-4 bottom-[-1px] z-10'>
          <Tabs activeTabIndex={activeTabIndex} tabs={tabs} />
        </div>
      </div>
    </div>
  );
};
