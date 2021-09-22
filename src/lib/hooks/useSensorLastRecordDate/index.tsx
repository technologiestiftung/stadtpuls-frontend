import { getSensorLastRecordDate } from "@lib/requests/getSensorLastRecordDate";
import useSWR from "swr";

interface useSensorLastRecordDateReturnType {
  isLoading: boolean;
  lastRecordDate: string | undefined;
  error: Error | null;
}

const fetchSensorLastRecordDate = async (
  sensorId: number | undefined
): Promise<string | null> => {
  if (!sensorId) return null;

  const lastRecordDate = await getSensorLastRecordDate(sensorId);
  return lastRecordDate || null;
};

export const useSensorLastRecordDate = (
  sensorId: number | undefined
): useSensorLastRecordDateReturnType => {
  const params = [`sensor-${sensorId || "no"}-lastRecordDate`, sensorId];
  const { data: lastRecordDate, error } = useSWR<string | null, Error>(
    params,
    () => fetchSensorLastRecordDate(sensorId)
  );

  return {
    isLoading: lastRecordDate === null,
    lastRecordDate: lastRecordDate || undefined,
    error: error || null,
  };
};
