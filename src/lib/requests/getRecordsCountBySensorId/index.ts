import { getRecordsBySensorId } from "../getRecordsBySensorId";

export const getRecordsCountBySensorId = async (
  sensorId: number
): Promise<number | null> => {
  const { count } = await getRecordsBySensorId(`${sensorId}`);
  return count;
};
