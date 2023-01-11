import { sensorQueryString } from "@lib/requests/getPublicSensors";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { SensorQueryResponseType } from "@lib/hooks/usePublicSensors";

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
