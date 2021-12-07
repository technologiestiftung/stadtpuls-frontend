import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";
import {
  mapPublicAccount,
  ParsedAccountType,
} from "@lib/hooks/usePublicAccounts";
import { errors } from "../getPublicSensors";

export interface GetAccountsOptionsType {
  rangeStart?: number;
  rangeEnd?: number;
}

export const getPublicAccounts = async (
  options?: GetAccountsOptionsType
): Promise<ParsedAccountType[]> => {
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

  if (
    options &&
    (options.rangeStart || options.rangeStart === 0) &&
    options.rangeEnd
  ) {
    const { data: extended_user_profiles, error } = await supabase
      .from<definitions["extended_user_profiles"]>("extended_user_profiles")
      .select("*")
      .range(options.rangeStart, options.rangeEnd);

    if (error) throw error;
    if (!extended_user_profiles) return [];

    const accounts = extended_user_profiles.map(mapPublicAccount);
    return accounts;
  } else {
    const { data: extended_user_profiles, error } = await supabase
      .from<definitions["extended_user_profiles"]>("extended_user_profiles")
      .select("*");

    if (error) throw error;
    if (!extended_user_profiles) return [];

    const accounts = extended_user_profiles.map(mapPublicAccount);
    return accounts;
  }
};
