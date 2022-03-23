import { mapPublicSensor } from "../usePublicSensors";
import { supabase } from "@auth/supabase";
import useSWR from "swr";
import {
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { sensorQueryString } from "@lib/requests/getPublicSensors";

// The following is a quickfix because we currently know what our curated sensors are
// In the future we might wanna save them in a DB table
// TODO: Refactor this!
const isProduction =
  process.env["NODE_ENV"] === "production" &&
  process.env["VERCEL_ENV"] !== "preview";
const PRODUCTION_SENSORS_IDS = [22, 23, 24, 25, 27, 28, 29];
const STAGING_SENSORS_IDS = [41, 37, 24, 35, 38, 36, 44];

export const getCuratedSensorImageById = (id: number): string => {
  if (isProduction) return `/images/sensors/${id}.jpeg`;
  const indexOfId = STAGING_SENSORS_IDS.indexOf(id);
  return `/images/sensors/${PRODUCTION_SENSORS_IDS[indexOfId]}.jpeg`;
};

export const getCuratedSensors = async (): Promise<ParsedSensorType[]> => {
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    .in(
      "id",
      // The following is a quickfix because we currently know what our curated sensors are
      // In the future we might wanna save them in a DB table
      // TODO: Refactor this!
      isProduction ? PRODUCTION_SENSORS_IDS : STAGING_SENSORS_IDS
    );

  if (error) throw error;
  if (!data) return [];
  const sensors = data?.map(mapPublicSensor);

  return sensors;
};

export const useCuratedSensors = (): {
  data: ParsedSensorType[] | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<ParsedSensorType[], Error>(
    "useCuratedSensors",
    getCuratedSensors
  );

  return {
    data: error ? null : data || null,
    error: error || null,
  };
};
