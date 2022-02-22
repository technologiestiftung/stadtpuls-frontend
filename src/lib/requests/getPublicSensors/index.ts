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
  user:user_profiles!user_id (
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
): Promise<{
  sensors: ParsedSensorType[];
  count: number;
}> => {
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
    const { data, count, error } = await supabase
      .from<SensorQueryResponseType>("sensors")
      .select(sensorQueryString, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(options.rangeStart, options.rangeEnd);

    if (error) throw error;
    if (!data || typeof count !== "number") return { sensors: [], count: 0 };
    const sensors = data?.map(mapPublicSensor);

    return { sensors, count };
  } else {
    const { data, count, error } = await supabase
      .from<SensorQueryResponseType>("sensors")
      .select(sensorQueryString, { count: "exact" })
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || typeof count !== "number") return { sensors: [], count: 0 };
    const sensors = data?.map(mapPublicSensor);

    return { sensors, count };
  }
};
