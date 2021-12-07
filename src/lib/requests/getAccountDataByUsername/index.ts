import {
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";
import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { sensorQueryString } from "@lib/requests/getPublicSensors";

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
}

export interface AccountWithSensorsType
  extends Omit<ParsedAccountType, "sensors"> {
  sensors: ParsedSensorType[];
}

export const getAccountDataByUsername = async (
  username: string
): Promise<AccountWithSensorsType> => {
  const { data: accountData, error: usersError } = await supabase
    .from<definitions["extended_user_profiles"]>("extended_user_profiles")
    .select("*")
    .ilike("username", username)
    .single();
  if (usersError) throw usersError;
  if (!accountData)
    throw new Error(`No account found with username "${username}"`);

  const { data: sensors, error: sensorsError } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    .eq("user_id", accountData.id as string);
  if (sensorsError) throw sensorsError;
  if (!accountData)
    throw new Error(`No account found with username "${username}"`);

  const accountDataWithSensors = {
    ...mapPublicAccount(accountData),
    sensors: sensors?.map(mapPublicSensor) || [],
  };
  return accountDataWithSensors;
};
