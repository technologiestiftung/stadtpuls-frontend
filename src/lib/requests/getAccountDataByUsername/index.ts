import {
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import { supabase } from "@auth/supabase";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { sensorQueryString } from "@lib/requests/getPublicSensors";

export interface AccountWithSensorsType
  extends Omit<ParsedAccountType, "sensors"> {
  sensors: ParsedSensorType[];
}

export const getAccountDataByUsername = async (
  username?: string
): Promise<AccountWithSensorsType | undefined> => {
  if (!username) return undefined;
  const { data: accountData, error: usersError } = await supabase
    .from<definitions["extended_user_profiles"]>("extended_user_profiles")
    .select("*")
    .ilike("username", username.trim())
    .single();
  if (usersError) throw usersError;
  if (!accountData)
    throw new Error(`No account found with username "${username}"`);

  const { data: sensors, error: sensorsError } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    .eq("user_id", String(accountData.id).trim());
  if (sensorsError) throw sensorsError;
  if (!accountData)
    throw new Error(`No sensors found for username "${username}"`);

  const accountDataWithSensors = {
    ...mapPublicAccount(accountData),
    sensors: sensors?.map(mapPublicSensor) || [],
  };
  return accountDataWithSensors;
};
