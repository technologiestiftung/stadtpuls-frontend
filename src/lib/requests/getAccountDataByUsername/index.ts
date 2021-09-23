import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
}

export const getAccountDataByUsername = async (
  username: string
): Promise<definitions["user_profiles"]> => {
  const { data: accountData, error } = await supabase
    .from<definitions["user_profiles"]>("user_profiles")
    .select("*")
    .eq("name", username);

  if (error) throw error;
  if (!accountData || accountData.length < 1)
    throw new Error(`No account found with username "${username}"`);
  return accountData[0];
};
