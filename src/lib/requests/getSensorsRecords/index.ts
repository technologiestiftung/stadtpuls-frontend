import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";
import { getRecordsBySensorId } from "../getRecordsBySensorId";

export interface GetSensorsOptionsType {
  ids: number[];
}

export type SensorsRecordsMapType = Record<string, definitions["records"][]>;

export const getSensorsRecords = async (
  ids?: number[]
): Promise<SensorsRecordsMapType> => {
  if (!ids || ids.length === 0) return {};
  const sensorsRecordsMap = {} as SensorsRecordsMapType;

  for (const sensorId of ids) {
    const { records } = await getRecordsBySensorId(`${sensorId}`);
    sensorsRecordsMap[sensorId] = records;
  }

  return sensorsRecordsMap;
};
