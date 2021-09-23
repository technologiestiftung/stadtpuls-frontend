import { Tabs } from "@components/Tabs";
import { PublicAccountType } from "@lib/hooks/usePublicAccounts";
import { FC } from "react";
import { UserInfoHeader } from ".";

interface UserInfoWithDataPropType {
  initialAccount: PublicAccountType;
  activeTabIndex: 0 | 1;
}

export const UserInfoWithData: FC<UserInfoWithDataPropType> = ({
  initialAccount,
  activeTabIndex,
}) => {
  return (
    <div className='border-b border-gray-200 pt-8'>
      <div className='container max-w-8xl mx-auto px-4 relative'>
        <UserInfoHeader {...initialAccount} />
        <div className='absolute left-0 bottom-[-1px] z-10'>
          <Tabs
            activeTabIndex={activeTabIndex}
            tabs={[
              {
                id: "sensors",
                name: "Sensoren",
                href: `/accounts/${initialAccount.username}`,
              },
              {
                id: "tokens",
                name: "Tokens",
                href: `/accounts/${initialAccount.username}/tokens`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
