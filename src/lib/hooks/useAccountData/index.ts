import useSWR from "swr";
import {
  AccountWithSensorsType,
  getAccountDataByUsername,
} from "@lib/requests/getAccountDataByUsername";

interface useAccountDataParamsType {
  username?: string;
  initialData?: AccountWithSensorsType;
}

interface useAccountDataReturnType {
  isLoading: boolean;
  account: AccountWithSensorsType | null;
  error: Error | null;
}

export const useAccountData = ({
  username,
  initialData,
}: useAccountDataParamsType): useAccountDataReturnType => {
  const params = [`account-${username || "no"}-data`];
  const { data, error } = useSWR<AccountWithSensorsType | undefined, Error>(
    params,
    () => getAccountDataByUsername(username),
    { initialData }
  );

  return {
    isLoading: !data && !error,
    account: data || null,
    error: error || null,
  };
};
