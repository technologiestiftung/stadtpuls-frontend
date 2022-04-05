import useSWR from "swr";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { IntegrationType } from "@lib/integrationsUtil";
import {
  getPublicSensors,
  GetSensorsOptionsType,
} from "@lib/requests/getPublicSensors";
import { LineGraphType } from "@common/interfaces";

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
  parsedRecords?: LineGraphType["data"];
  categoryId: number;
  categoryName: string;
  connectionType: IntegrationType;
  ttnDeviceId?: string;
  latitude: number;
  longitude: number;
}

export const parseSensorRecords = (
  records:
    | Pick<definitions["records"], "id" | "recorded_at" | "measurements">[]
    | undefined
): LineGraphType["data"] => {
  if (!records) return [];
  if (records.length === 0) return [];

  const mappedRecords = records.map(record => ({
    id: record.id,
    date: new Date(record.recorded_at),
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
    authorName: user.display_name || user.name || "Anonymous",
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

interface usePublicSensorsParamsType {
  rangeStart: GetSensorsOptionsType["rangeStart"];
  rangeEnd: GetSensorsOptionsType["rangeEnd"];
  initialData?: {
    sensors: ParsedSensorType[];
    count: number;
  };
}

interface DataType {
  sensors: ParsedSensorType[];
  count: number;
}

export const usePublicSensors = (
  {
    rangeStart,
    rangeEnd,
    initialData,
  }: usePublicSensorsParamsType = {} as usePublicSensorsParamsType
): DataType & {
  error: Error | null;
  isLoading: boolean;
} => {
  const params = ["usePublicSensors", rangeStart, rangeEnd, initialData];
  const { data, error } = useSWR<DataType, Error>(
    params,
    () =>
      getPublicSensors({
        rangeStart,
        rangeEnd,
      }),
    { fallbackData: initialData }
  );

  return {
    sensors: data?.sensors || [],
    count: data?.count || 0,
    isLoading: !data && !error,
    error: error || null,
  };
};
