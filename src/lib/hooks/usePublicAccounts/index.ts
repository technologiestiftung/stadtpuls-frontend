import { RECORDS_LIMIT, sensorQueryString } from "@lib/hooks/usePublicSensors";
import { supabase } from "@auth/supabase";
import useSWR from "swr";
import { definitions } from "@common/types/supabase";
import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "../usePublicSensors";

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

export const getPublicAccounts = async (): Promise<ParsedAccountType[]> => {
  const { data, error } = await supabase
    .from<AccountQueryResponseType>("user_profiles")
    .select(accountQueryString)
    .order("created_at")
    // FIXME: created_at is not recognized altought it is inherited from the definitions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .order("recorded_at", {
      foreignTable: "sensors.records",
      ascending: false,
    })
    .limit(RECORDS_LIMIT, { foreignTable: "sensors.records" });

  if (error) throw error;
  if (!data) return [];
  const accounts = data.map(mapPublicAccount);

  return accounts;
};

export const usePublicAccounts = (
  initialData?: ParsedAccountType[]
): {
  accounts: ParsedAccountType[];
  error: Error | null;
} => {
  const { data, error } = useSWR<ParsedAccountType[] | null, Error>(
    ["usePublicAccounts"],
    () => getPublicAccounts(),
    { initialData }
  );

  return {
    accounts: data || [],
    error: error || null,
  };
};
