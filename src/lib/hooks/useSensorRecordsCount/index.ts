import { getRecordsCountBySensorId } from "@lib/requests/getRecordsCountBySensorId";
import useSWR from "swr";

interface useSensorRecordsReturnType {
  isLoading: boolean;
  count: number | null;
  error: Error | null;
}

const fetchSensorRecordsCount = async (
  sensorId: number | undefined
): Promise<number | null> => {
  if (!sensorId) return null;

  const count = await getRecordsCountBySensorId(sensorId);
  return count;
};

export const useSensorRecordsCount = (
  sensorId: number | undefined
): useSensorRecordsReturnType => {
  const params = [`sensor-${sensorId || "no"}-records-count`, sensorId];
  const { data: count, error } = useSWR<number | null, Error>(params, () =>
    fetchSensorRecordsCount(sensorId)
  );

  return {
    isLoading: count === undefined,
    count: count || null,
    error: error || null,
  };
};
