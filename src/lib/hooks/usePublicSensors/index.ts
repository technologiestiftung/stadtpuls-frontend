import { supabase } from "@auth/supabase";
import useSWR from "swr";
import { definitions } from "@common/types/supabase";
import { DateValueType } from "@common/interfaces";

export const RECORDS_LIMIT = 500;

export const sensorQueryString = `
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
`;

type SensorType = definitions["sensors"];
export interface SensorQueryResponseType extends SensorType {
  records: Pick<
    definitions["records"],
    "id" | "recorded_at" | "measurements"
  >[];
  user: Pick<definitions["user_profiles"], "id" | "name" | "display_name">;
  category: Pick<definitions["categories"], "id" | "name">;
}

export interface ParsedSensorType {
  id: number;
  name: string;
  createdAt: string;
  description?: string;
  location?: string;
  symbolId: number;
  authorId: string;
  authorName: string;
  authorUsername: string;
  parsedRecords: DateValueType[];
  categoryId: number;
  categoryName: string;
  connectionType: "http" | "ttn";
  ttnDeviceId?: string;
  latitude: number;
  longitude: number;
}

export const parseSensorRecords = (
  records:
    | Pick<definitions["records"], "recorded_at" | "measurements">[]
    | undefined
): DateValueType[] => {
  if (!records) return [];
  if (records.length === 0) return [];

  const mappedRecords = records.map(record => ({
    date: record.recorded_at,
    value: record.measurements ? record.measurements[0] : 0,
  }));
  return mappedRecords;
};

export const mapPublicSensor = (
  sensor: SensorQueryResponseType
): ParsedSensorType => {
  const {
    name,
    created_at,
    description,
    location,
    latitude,
    longitude,
    user,
    user_id,
    category,
    external_id,
    connection_type,
    records,
    icon_id,
  } = sensor;
  return {
    id: sensor.id,
    name: name || `Sensor ${sensor.id}`,
    description: description,
    createdAt: created_at,
    location: location,
    symbolId: icon_id || 1,
    authorId: user_id,
    authorName: user.display_name || "Anonymous",
    authorUsername: user.name || "anonymous",
    parsedRecords: parseSensorRecords(records),
    categoryName: category?.name || "CO2",
    categoryId: category?.id || 1,
    connectionType:
      !connection_type || connection_type === "other"
        ? ("http" as const)
        : connection_type,
    ttnDeviceId: external_id,
    latitude: latitude || 0,
    longitude: longitude || 0,
  };
};

export const getPublicSensors = async (): Promise<ParsedSensorType[]> => {
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    // FIXME: created_at is not recognized altought it is inherited from the definitions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .order("recorded_at", {
      foreignTable: "records",
      ascending: false,
    })
    .limit(RECORDS_LIMIT, { foreignTable: "records" });

  if (error) throw error;
  if (!data) return [];
  const sensors = data?.map(mapPublicSensor);

  return sensors;
};

export const usePublicSensors = (
  initialData = [] as ParsedSensorType[]
): {
  data: ParsedSensorType[];
  error: Error | null;
} => {
  const { data, error } = useSWR<ParsedSensorType[], Error>(
    ["usePublicSensors"],
    () => getPublicSensors(),
    { initialData }
  );

  return {
    data: data || [],
    error: error || null,
  };
};
