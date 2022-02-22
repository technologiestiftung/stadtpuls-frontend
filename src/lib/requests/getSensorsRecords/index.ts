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
    .filter("id", "in", `(${ids.toString()})`)
    // FIXME: recorded_at is not recognized altought it is inherited from the definitions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .order("recorded_at", {
      foreignTable: "records",
      ascending: false,
    })
    .limit(RECORDS_LIMIT, { foreignTable: "records" });

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
