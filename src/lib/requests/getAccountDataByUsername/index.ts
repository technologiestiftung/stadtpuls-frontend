import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { getPublicAccounts } from "../getPublicAccounts";
import { getPublicSensors } from "../getPublicSensors";

export interface AccountWithSensorsType
  extends Omit<ParsedAccountType, "sensors"> {
  sensors: ParsedSensorType[];
}

export const getAccountDataByUsername = async (
  username?: string
): Promise<AccountWithSensorsType | undefined> => {
  if (!username) return undefined;
  const { accounts: allAccounts } = await getPublicAccounts();
  const accountData = allAccounts.find(
    account => account.username === username
  );
  if (!accountData)
    throw new Error(`No account found with username "${username}"`);

  const { sensors: allSensors } = await getPublicSensors();
  const sensors = allSensors.filter(sensor =>
    accountData.sensors.includes(sensor.id)
  );

  const accountDataWithSensors = {
    ...accountData,
    sensors,
  };
  return accountDataWithSensors;
};
