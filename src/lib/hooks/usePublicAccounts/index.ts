import { sensorQueryString } from "@lib/requests/getPublicSensors";
import useSWR from "swr";
import { definitions } from "@common/types/supabase";
import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "../usePublicSensors";
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
  sensors: ParsedSensorType[];
}

export const mapPublicAccount = ({
  sensors,
  ...user
}: AccountQueryResponseType): ParsedAccountType => ({
  id: user.id,
  username: user.name || "anonymous",
  displayName: user.display_name || user.name || "Anonymous",
  createdAt: user.created_at,
  link: user.url,
  description: user.description,
  sensorsCount: sensors.length || 0,
  recordsCount: sensors.reduce(
    (acc, { records }) => acc + records.length,
    0 as number
  ),
  categories: sensors
    .reduce((acc, sensor) => [...acc, sensor.category_id], [] as number[])
    .filter((val, ind, arr) => arr.indexOf(val) === ind),
  sensors: sensors.map(mapPublicSensor),
});

interface usePublicAccountsParamsType {
  rangeStart: GetAccountsOptionsType["rangeStart"];
  rangeEnd: GetAccountsOptionsType["rangeEnd"];
  initialData: ParsedAccountType[] | undefined;
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
