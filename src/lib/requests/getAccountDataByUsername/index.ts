import {
  AccountQueryResponseType,
  accountQueryString,
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import { supabase } from "@auth/supabase";

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
}

export const getAccountDataByUsername = async (
  username: string
): Promise<ParsedAccountType> => {
  const {
    data: accountData,
    error,
  } = await supabase
    .from<AccountQueryResponseType>("user_profiles")
    .select(accountQueryString)
    .eq("name", username)
    .single();
  if (error) throw error;
  if (!accountData)
    throw new Error(`No account found with username "${username}"`);
  return mapPublicAccount(accountData);
};
