import { supabase } from "@auth/supabase";
import {
  ParsedSensorType,
  SensorQueryResponseType,
  mapPublicSensor,
} from "@lib/hooks/usePublicSensors";

export const RECORDS_LIMIT = 500;
export const errors = {
  rangeEndGreaterThanRangeStart: "rangeEnd can not be smaller than rangeStart",
  onlyOneRangeValue: "rangeStart and rangeEnd must both be provided",
};

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
    throw new Error(errors.rangeEndGreaterThanRangeStart);

  if (
    (options &&
      typeof options.rangeStart !== "undefined" &&
      typeof options.rangeEnd === "undefined") ||
    (options &&
      typeof options.rangeStart === "undefined" &&
      typeof options.rangeEnd !== "undefined")
  )
    throw new Error(errors.onlyOneRangeValue);

  if (
    options &&
    (options.rangeStart || options.rangeStart === 0) &&
    options.rangeEnd
  ) {
    const { data, error } = await supabase
      .from<SensorQueryResponseType>("sensors")
      .select(sensorQueryString)
      .order("created_at", { ascending: false })
      .range(options.rangeStart, options.rangeEnd)
      .limit(RECORDS_LIMIT, { foreignTable: "records" });

    if (error) throw error;
    if (!data) return [];
    console.log(data[0].records);
    const sensors = data?.map(mapPublicSensor);

    return sensors;
  } else {
    const { data, error } = await supabase
      .from<SensorQueryResponseType>("sensors")
      .select(sensorQueryString)
      .order("created_at", { ascending: false })
      .limit(RECORDS_LIMIT, { foreignTable: "records" });

    if (error) throw error;
    if (!data) return [];
    console.log(data[0].records);
    const sensors = data?.map(mapPublicSensor);

    return sensors;
  }
};
