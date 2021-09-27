import { FC } from "react";
import { AccountCard } from "@components/AccountCard";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";

interface AccountsGridType {
  accounts: ParsedAccountType[];
}

export const AccountsGrid: FC<AccountsGridType> = ({ accounts }) => {
  return (
    <div
      className='grid sm:grid-cols-2 2xl:grid-cols-3 mx-auto gap-4 sm:gap-6 md:gap-8'
      style={{ maxWidth: 1920 }}
    >
      {accounts &&
        accounts.map(account => {
          return <AccountCard key={account.id} {...account} />;
        })}
    </div>
  );
};
