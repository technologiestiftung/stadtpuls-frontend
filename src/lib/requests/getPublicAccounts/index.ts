import { supabase } from "@auth/supabase";
import {
  ParsedAccountType,
  AccountQueryResponseType,
  accountQueryString,
  mapPublicAccount,
} from "@lib/hooks/usePublicAccounts";
import { errors, RECORDS_LIMIT } from "../getPublicSensors";

const alphabeticalAccountsSorter = (
  a: ParsedAccountType,
  b: ParsedAccountType
): number => {
  if (a.username.toLowerCase() < b.username.toLowerCase()) {
    return -1;
  }
  if (a.username.toLowerCase() > b.username.toLowerCase()) {
    return 1;
  }
  return 0;
};

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
    const { data, error } = await supabase
      .from<AccountQueryResponseType>("user_profiles")
      .select(accountQueryString)
      .order("name")
      // FIXME: recorded_at is not recognized altought it is inherited from the definitions
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .order("recorded_at", {
        foreignTable: "sensors.records",
        ascending: false,
      })
      .range(options.rangeStart, options.rangeEnd)
      .limit(RECORDS_LIMIT, { foreignTable: "sensors.records" });

    if (error) throw error;
    if (!data) return [];
    const accounts = data
      .map(mapPublicAccount)
      .sort(alphabeticalAccountsSorter);

    return accounts;
  } else {
    const { data, error } = await supabase
      .from<AccountQueryResponseType>("user_profiles")
      .select(accountQueryString)
      .order("name")
      // FIXME: recorded_at is not recognized altought it is inherited from the definitions
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .order("recorded_at", {
        foreignTable: "sensors.records",
        ascending: false,
      })
      .limit(RECORDS_LIMIT, { foreignTable: "sensors.records" });

    if (error) throw error;
    if (!data) return [];
    const accounts = data
      .map(mapPublicAccount)
      .sort(alphabeticalAccountsSorter);

    return accounts;
  }
};
