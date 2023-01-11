import { getRecordsBySensorId } from "../getRecordsBySensorId";

export const getSensorLastRecordDate = async (
  sensorId: number
): Promise<string | undefined> => {
  const { records } = await getRecordsBySensorId(`${sensorId}`);
  return records[0]?.recorded_at;
};
