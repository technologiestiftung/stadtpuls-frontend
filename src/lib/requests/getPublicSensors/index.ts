import { supabase } from "@auth/supabase";
import {
  ParsedSensorType,
  SensorQueryResponseType,
  mapPublicSensor,
} from "@lib/hooks/usePublicSensors";

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

export interface GetSensorsOptionsType {
  rangeStart?: number;
  rangeEnd?: number;
}

export const getPublicSensors = async (
  options?: GetSensorsOptionsType
): Promise<ParsedSensorType[]> => {
  if (
    options &&
    typeof options.rangeStart !== "undefined" &&
    typeof options.rangeEnd !== "undefined" &&
    options.rangeEnd <= options.rangeStart
  )
    throw new Error("rangeEnd can not be smaller than rangeStart");

  if (
    (options &&
      typeof options.rangeStart !== "undefined" &&
      typeof options.rangeEnd === "undefined") ||
    (options &&
      typeof options.rangeStart === "undefined" &&
      typeof options.rangeEnd !== "undefined")
  )
    throw new Error("rangeStart and rangeEnd mus both be provided");

  if (options && options.rangeStart && options.rangeEnd) {
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
      .range(options.rangeStart, options.rangeEnd)
      .limit(RECORDS_LIMIT, { foreignTable: "records" });

    if (error) throw error;
    if (!data) return [];
    const sensors = data?.map(mapPublicSensor);

    return sensors;
  } else {
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
  }
};
