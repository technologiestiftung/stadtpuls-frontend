import useSWR from "swr";
import {
  getSensorsRecords,
  SensorsRecordsMapType,
} from "@lib/requests/getSensorsRecords";

interface UseSensorsRecordsReturnType {
  isLoading: boolean;
  sensorsRecordsMap: SensorsRecordsMapType;
  error: Error | null;
}

export const useSensorsRecords = (
  ids: number[] = []
): UseSensorsRecordsReturnType => {
  const params = [
    `sensors-records-${ids.length > 0 ? ids.sort().join("-") : "noids"}-data`,
  ];
  const { data, error } = useSWR<SensorsRecordsMapType, Error>(params, () =>
    getSensorsRecords(ids)
  );

  return {
    isLoading: !data && !error,
    sensorsRecordsMap: data || {},
    error: error || null,
  };
};
