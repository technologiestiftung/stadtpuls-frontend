import { getSensorLastRecordDate } from "@lib/requests/getSensorLastRecordDate";
import useSWR from "swr";

interface useSensorLastRecordDateReturnType {
  isLoading: boolean;
  lastRecordDate: string | undefined;
  error: Error | null;
}

const fetchSensorLastRecordDate = async (
  deviceId: number | undefined
): Promise<string | null> => {
  if (!deviceId) return null;

  const lastRecordDate = await getSensorLastRecordDate(deviceId);
  return lastRecordDate || null;
};

export const useSensorLastRecordDate = (
  deviceId: number | undefined
): useSensorLastRecordDateReturnType => {
  const params = [`device-${deviceId || "no"}-lastRecordDate`, deviceId];
  const { data: lastRecordDate, error } = useSWR<string | null, Error>(
    params,
    () => fetchSensorLastRecordDate(deviceId)
  );

  return {
    isLoading: lastRecordDate === null,
    lastRecordDate: lastRecordDate || undefined,
    error: error || null,
  };
};
