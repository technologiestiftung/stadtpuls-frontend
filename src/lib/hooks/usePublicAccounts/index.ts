import { supabase } from "@auth/supabase";
import useSWR from "swr";
import { definitions } from "@common/types/supabase";

export const accountQueryString = `
  id,
  name,
  display_name,
  created_at,
  url,
  description,
  sensors (
    id,
    category_id,
    records (
      id
    )
  )
`;

type AccountType = definitions["user_profiles"];

interface SensorWithRecordsType
  extends Pick<definitions["sensors"], "id" | "created_at" | "category_id"> {
  records: Pick<definitions["records"], "id">[];
}
export interface AccountQueryResponseType extends AccountType {
  sensors: SensorWithRecordsType[];
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
): Omit<PublicAccountType, "sensorsCount" | "recordsCount" | "categories"> => ({
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
