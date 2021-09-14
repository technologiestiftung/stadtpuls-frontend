import {
  mapPublicSensor,
  sensorQueryString,
  RECORDS_LIMIT,
} from "../usePublicSensors";
import { supabase } from "@auth/supabase";
import useSWR from "swr";
import { PublicSensorType, SensorQueryResponseType } from "@common/interfaces";

const SENSORS_LIMIT = 3;

export const getCuratedSensors = async (): Promise<PublicSensorType[]> => {
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
  data: PublicSensorType[] | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<PublicSensorType[], Error>(
    "useCuratedProjects",
    getCuratedSensors
  );

  return {
    data: data || null,
    error: error || null,
  };
};
