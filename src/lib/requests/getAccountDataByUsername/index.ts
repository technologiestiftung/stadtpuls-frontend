import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";
import { getPublicAccounts } from "../getPublicAccounts";
import { getPublicSensors } from "../getPublicSensors";
import { getSensorsRecords } from "../getSensorsRecords";

type RecordType = Omit<definitions["records"], "measurements"> & {
  measurements: number[];
};

export interface AccountWithSensorsType
  extends Omit<ParsedAccountType, "sensors"> {
  sensors: (Omit<ParsedSensorType, "parsedRecords"> & {
    parsedRecords: RecordType[];
  })[];
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

  const sensorsRecordsMap = await getSensorsRecords(
    sensors.map(({ id }) => id)
  );
  const sensorsWithRecords = sensors.map(sensor => ({
    ...sensor,
    parsedRecords: (sensorsRecordsMap[sensor.id] || []).map(record => ({
      ...record,
      measurements: (record.measurements || []) as number[],
    })),
  }));

  const accountDataWithSensors = {
    ...accountData,
    sensors: sensorsWithRecords,
  };

  return accountDataWithSensors;
};
