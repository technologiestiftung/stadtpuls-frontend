import { mapPublicSensor } from "../usePublicSensors";
import { supabase } from "@auth/supabase";
import useSWR from "swr";
import {
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import {
  sensorQueryString,
  RECORDS_LIMIT,
} from "@lib/requests/getPublicSensors";

export const getCuratedSensors = async (): Promise<ParsedSensorType[]> => {
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    .in(
      "id",
      // The following is a quickfix because we currently know what our curated sensors are
      // In the future we might wanna save them in a DB table
      // TODO: Refactor this!
      process.env["NODE_ENV"] === "production"
        ? [22, 23, 24, 25, 26, 27, 28, 29] // -> Production
        : [35, 36, 37, 38, 39, 40, 41, 44] // -> Staging
    )
    //FIXME: the ignorance
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
