import { sensorQueryString } from "@lib/requests/getPublicSensors";
import useSWR from "swr";
import { definitions } from "@common/types/supabase";
import { SensorQueryResponseType } from "../usePublicSensors";
import {
  GetAccountsOptionsType,
  getPublicAccounts,
} from "@lib/requests/getPublicAccounts";

export const accountQueryString = `
  id,
  name,
  display_name,
  created_at,
  url,
  description,
  sensors (
    ${sensorQueryString}
  )
`;

type AccountType = definitions["user_profiles"];
export interface AccountQueryResponseType extends AccountType {
  sensors: SensorQueryResponseType[];
  user: Pick<definitions["user_profiles"], "name" | "display_name">;
}

export interface ParsedAccountType {
  id: string;
  username: string;
  displayName: string;
  createdAt: string;
  link?: string;
  description?: string;
  categories: definitions["categories"]["id"][];
  sensorsCount: number;
  recordsCount: number;
  sensors: definitions["extended_user_profiles"]["sensors"];
}

export const mapPublicAccount = ({
  ...user
}: definitions["extended_user_profiles"]): ParsedAccountType => ({
  id: user.id || "",
  username: user.username || "anonymous",
  displayName: user.display_name || user.username || "Anonymous",
  createdAt: user.created_at || "",
  link: user.link,
  description: user.description,
  sensorsCount: user.sensors_count || 0,
  recordsCount: user.records_count || 0,
  categories: user.categories || [],
  sensors: user.sensors,
});

interface usePublicAccountsParamsType {
  rangeStart: GetAccountsOptionsType["rangeStart"];
  rangeEnd: GetAccountsOptionsType["rangeEnd"];
  initialData?: ParsedAccountType[];
}

export const usePublicAccounts = (
  {
    rangeStart,
    rangeEnd,
    initialData,
  }: usePublicAccountsParamsType = {} as usePublicAccountsParamsType
): {
  accounts: ParsedAccountType[];
  error: Error | null;
} => {
  const { data, error } = useSWR<ParsedAccountType[] | null, Error>(
    ["usePublicAccounts", rangeStart, rangeEnd, initialData],
    () =>
      getPublicAccounts({
        rangeStart,
        rangeEnd,
      }),
    { initialData }
  );

  return {
    accounts: data || [],
    error: error || null,
  };
};
