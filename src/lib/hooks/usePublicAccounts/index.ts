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
  records (
    id
  ),
  sensors (
    id
    category_id
  ),
  user:user_id (
    name,
    display_name
  ),
  category:category_id (
    id,
    name
  )
`;

type AccountType = definitions["user_profiles"];
export interface AccountQueryResponseType extends AccountType {
  records: Pick<definitions["records"], "id">[];
  sensors: Pick<definitions["sensors"], "id" | "category_id">[];
  user: Pick<definitions["user_profiles"], "name" | "display_name">;
}

export interface PublicAccountType {
  id: string;
  username: string;
  displayName: string;
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

export const mapPublicAccount = ({
  id,
  name,
  display_name,
  description,
  url,
  sensors,
  records,
}: AccountQueryResponseType): PublicAccountType => ({
  id: id,
  username: name || "anonymous",
  displayName: display_name || "Anonymous",
  link: url,
  description: description,
  sensorsCount: sensors.length || 0,
  recordsCount: records.length || 0,
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
