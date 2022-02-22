import { supabase } from "@auth/supabase";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import {
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import { errors } from "@lib/requests/getPublicSensors";

export interface GetAccountsOptionsType {
  rangeStart?: number;
  rangeEnd?: number;
}

export const getPublicAccounts = async (
  options?: GetAccountsOptionsType
): Promise<{
  accounts: ParsedAccountType[];
  count: number;
}> => {
  if (
    options &&
    typeof options.rangeStart !== "undefined" &&
    typeof options.rangeEnd !== "undefined" &&
    options.rangeEnd <= options.rangeStart
  )
    throw new Error(errors.rangeEndGreaterThanRangeStart);

  if (
    (options &&
      typeof options.rangeStart !== "undefined" &&
      typeof options.rangeEnd === "undefined") ||
    (options &&
      typeof options.rangeStart === "undefined" &&
      typeof options.rangeEnd !== "undefined")
  )
    throw new Error(errors.onlyOneRangeValue);

  const defaultRangeStart = 0;
  const defaultRangeEnd =
    Number.parseInt(process.env.NEXT_PUBLIC_SUPABASE_MAX_ROWS as string) ||
    1000;

  const {
    data: extended_user_profiles,
    count,
    error,
  } = await supabase
    .from<definitions["extended_user_profiles"]>("extended_user_profiles")
    .select("*", { count: "exact" })
    .range(
      options?.rangeStart || defaultRangeStart,
      options?.rangeEnd || defaultRangeEnd
    );

  if (error) throw error;
  if (!extended_user_profiles || !count) return { accounts: [], count: 0 };

  const accounts = extended_user_profiles.map(mapPublicAccount);
  return { count, accounts };
};
