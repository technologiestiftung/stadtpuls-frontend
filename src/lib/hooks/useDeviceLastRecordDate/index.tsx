import { getDeviceLastRecordDate } from "@lib/requests/getDeviceLastRecordDate";
import useSWR from "swr";

interface UseDeviceLastRecordDateReturnType {
  isLoading: boolean;
  lastRecordDate: string | undefined;
  error: Error | null;
}

const fetchDeviceLastRecordDate = async (
  deviceId: number | undefined
): Promise<string | null> => {
  if (!deviceId) return null;

  const lastRecordDate = await getDeviceLastRecordDate(deviceId);
  return lastRecordDate || null;
};

export const useDeviceLastRecordDate = (
  deviceId: number | undefined
): UseDeviceLastRecordDateReturnType => {
  const params = [`device-${deviceId || "no"}-lastRecordDate`, deviceId];
  const { data: lastRecordDate, error } = useSWR<string | null, Error>(
    params,
    () => fetchDeviceLastRecordDate(deviceId)
  );

  return {
    isLoading: lastRecordDate === null,
    lastRecordDate: lastRecordDate || undefined,
    error: error || null,
  };
};
