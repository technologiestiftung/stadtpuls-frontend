import { FC } from "react";
import { AccountCard } from "@components/AccountCard";
import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { AccoundCardLoadingSkeleton } from "@components/AccountCardLoadingSkeleton";

interface AccountsGridType {
  accounts: ParsedAccountType[];
  isLoading?: boolean;
}

export const AccountsGrid: FC<AccountsGridType> = ({
  accounts,
  isLoading = false,
}) => {
  return (
    <div
      className='grid sm:grid-cols-2 2xl:grid-cols-3 mx-auto gap-4 sm:gap-6 md:gap-8'
      style={{ maxWidth: 1920 }}
    >
      {!isLoading &&
        Array.isArray(accounts) &&
        accounts.map(account => {
          return <AccountCard key={account.id} {...account} />;
        })}
      {isLoading &&
        Array.from({ length: 6 }).map((_, index) => (
          <AccoundCardLoadingSkeleton key={index} />
        ))}
    </div>
  );
};
