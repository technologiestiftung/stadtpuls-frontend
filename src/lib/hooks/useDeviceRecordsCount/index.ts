import { getRecordsCountByDeviceId } from "@lib/requests/getRecordsCountByDeviceId";
import useSWR from "swr";

interface UseDeviceRecordsReturnType {
  isLoading: boolean;
  count: number | null;
  error: Error | null;
}

const fetchDeviceRecordsCount = async (
  deviceId: number | undefined
): Promise<number | null> => {
  if (!deviceId) return null;

  const count = await getRecordsCountByDeviceId(deviceId);
  return count;
};

export const useDeviceRecordsCount = (
  deviceId: number | undefined
): UseDeviceRecordsReturnType => {
  const params = [`device-${deviceId || "no"}-records-count`, deviceId];
  const { data: count, error } = useSWR<number | null, Error>(params, () =>
    fetchDeviceRecordsCount(deviceId)
  );

  return {
    isLoading: count === undefined,
    count: count || null,
    error: error || null,
  };
};
