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
    id,
    name,
    created_at,
    connection_type,
    external_id,
    description,
    location,
    latitude,
    longitude,
    altitude,
    category_id,
    icon_id,
    user_id,
    records (
      recorded_at,
      measurements
    ),
    user:user_id (
      name,
      display_name
    ),
    category:category_id (
      id,
      name
    )
  )
`;

type AccountType = definitions["user_profiles"];
export interface AccountQueryResponseType extends AccountType {
  sensors: SensorQueryResponseType[];
  user: Pick<definitions["user_profiles"], "name" | "display_name">;
}

export interface PublicAccountType {
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

export interface PublicAccounts {
  accounts: PublicAccountType[];
  count?: number;
}

interface OptionsType {
  initialData: null | {
    count: number;
    accounts: PublicAccountType[];
  };
}

export const dbUserToPublicAccount = (
  user: definitions["user_profiles"]
): Omit<
  PublicAccountType,
  "sensors" | "sensorsCount" | "recordsCount" | "categories"
> => ({
  id: user.id,
  username: user.name || "anonymous",
  displayName: user.display_name || "Anonymous",
  createdAt: user.created_at,
  link: user.url,
  description: user.description,
});

export const mapPublicAccount = ({
  sensors,
  ...user
}: AccountQueryResponseType): PublicAccountType => ({
  ...dbUserToPublicAccount(user),
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

export const getPublicAccounts = async (): Promise<PublicAccounts> => {
  const { data, error } = await supabase
    .from<AccountQueryResponseType>("user_profiles")
    .select(accountQueryString)
    .order("created_at");

  if (error) throw error;
  if (!data) return { accounts: [] };
  const accounts = data.map(mapPublicAccount);

  return { accounts };
};

const defaultOptions: OptionsType = {
  initialData: null,
};

export const usePublicAccounts = (
  options: Partial<OptionsType> = defaultOptions
): {
  data: PublicAccounts | null;
  error: Error | null;
} => {
  const initialData = options.initialData || defaultOptions.initialData;
  const { data, error } = useSWR<PublicAccounts | null, Error>(
    ["usePublicAccounts"],
    () => getPublicAccounts(),
    { initialData }
  );

  return {
    data: data || null,
    error: error || null,
  };
};
