import { DateValueType } from "@common/interfaces";
import { parseSensorRecords } from "@lib/hooks/usePublicSensors";
import { getRecordsBySensorId } from "../getRecordsBySensorId";

export interface GetSensorsOptionsType {
  ids: number[];
}

export type SensorsRecordsMapType = Record<string, DateValueType[]>;

export const getSensorsRecords = async (
  ids?: number[]
): Promise<SensorsRecordsMapType> => {
  if (!ids || ids.length === 0) return {};
  const sensorsRecordsMap = {} as SensorsRecordsMapType;

  for (const sensorId of ids) {
    const { records } = await getRecordsBySensorId(sensorId);
    sensorsRecordsMap[sensorId] = parseSensorRecords(records);
  }

  return sensorsRecordsMap;
};
