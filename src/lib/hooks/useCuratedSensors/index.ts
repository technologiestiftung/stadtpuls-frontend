import {
  mapPublicSensor,
  sensorQueryString,
  RECORDS_LIMIT,
} from "../usePublicSensors";
import { supabase } from "@auth/supabase";
import useSWR from "swr";
import {
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";

const SENSORS_LIMIT = 3;

export const getCuratedSensors = async (): Promise<ParsedSensorType[]> => {
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    //FIXME: the ignorance
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .order("recorded_at", {
      foreignTable: "records",
      ascending: false,
    })
    .limit(SENSORS_LIMIT)
    .limit(RECORDS_LIMIT, { foreignTable: "records" });

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
    data: data || null,
    error: error || null,
  };
};
