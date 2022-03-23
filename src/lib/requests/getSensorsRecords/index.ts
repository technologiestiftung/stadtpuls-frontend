import { supabase } from "@auth/supabase";
import { DateValueType } from "@common/interfaces";
import {
  SensorQueryResponseType,
  parseSensorRecords,
} from "@lib/hooks/usePublicSensors";

export const RECORDS_LIMIT = 20;

export const recordsQueryString = `
  id,
  records (
    recorded_at,
    measurements
  )
`;

export interface GetSensorsOptionsType {
  ids: number[];
}

export type SensorsRecordsMapType = Record<string, DateValueType[]>;

export const getSensorsRecords = async (
  ids?: number[]
): Promise<SensorsRecordsMapType> => {
  if (!ids || ids.length === 0) return {};
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(recordsQueryString)
    .filter("id", "in", `(${ids.toString()})`);

  if (error) throw error;
  if (!data) return {};
  const sensorsRecordsMap = data?.reduce(
    (acc, s) => ({
      ...acc,
      [s.id]: parseSensorRecords(s.records),
    }),
    {}
  );

  return sensorsRecordsMap;
};
