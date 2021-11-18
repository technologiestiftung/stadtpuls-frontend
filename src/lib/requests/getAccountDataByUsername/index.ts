import {
  AccountQueryResponseType,
  accountQueryString,
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import { supabase } from "@auth/supabase";
import { RECORDS_LIMIT } from "@lib/requests/getPublicSensors";

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
}

export const getAccountDataByUsername = async (
  username: string
): Promise<ParsedAccountType> => {
  const { data: accountData, error } = await supabase
    .from<AccountQueryResponseType>("user_profiles")
    .select(accountQueryString)
    .ilike("name", username)
    // FIXME: created_at is not recognized altought it is inherited from the definitions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .order("recorded_at", {
      foreignTable: "sensors.records",
      ascending: false,
    })
    .limit(RECORDS_LIMIT, { foreignTable: "sensors.records" })
    .single();
  if (error) throw error;
  if (!accountData)
    throw new Error(`No account found with username "${username}"`);
  return mapPublicAccount(accountData);
};
