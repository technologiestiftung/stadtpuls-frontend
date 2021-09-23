import {
  AccountQueryResponseType,
  accountQueryString,
  mapPublicAccount,
  PublicAccountType,
} from "@lib/hooks/usePublicAccounts";
import { supabase } from "@auth/supabase";

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
}

export const getAccountDataByUsername = async (
  username: string
): Promise<PublicAccountType> => {
  const {
    data: accountData,
    error,
  } = await supabase
    .from<AccountQueryResponseType>("user_profiles")
    .select(accountQueryString)
    .eq("name", username);

  if (error) throw error;
  if (!accountData || accountData.length < 1)
    throw new Error(`No account found with username "${username}"`);
  return mapPublicAccount(accountData[0]);
};
