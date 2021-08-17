import { RecordsType } from "@common/types/supabase";
import { getRecordsByDeviceId } from "@lib/requests/getRecordsByDeviceId";
import useSWR from "swr";

interface UseDeviceRecordsParamsType {
  deviceId: number | undefined;
  startDateString?: string;
  endDateString?: string;
}

interface UseDeviceRecordsReturnType {
  isLoading: boolean;
  records: RecordsType[];
  error: Error | null;
}

type FetchDeviceRecordsSignature = (
  params: UseDeviceRecordsParamsType
) => Promise<RecordsType[]>;

const fetchDeviceRecords: FetchDeviceRecordsSignature = async ({
  deviceId,
  startDateString,
  endDateString,
}) => {
  if (!deviceId) return [];

  const records = await getRecordsByDeviceId(deviceId, {
    startDate: startDateString,
    endDate: endDateString,
  });
  return records;
};

export const useDeviceRecords = ({
  deviceId,
  startDateString,
  endDateString,
}: UseDeviceRecordsParamsType): UseDeviceRecordsReturnType => {
  const params = [
    `device-${deviceId || "no"}-records`,
    deviceId,
    startDateString,
    endDateString,
  ];
  const { data: records, error } = useSWR<RecordsType[], Error>(params, () =>
    fetchDeviceRecords({
      deviceId,
      startDateString,
      endDateString,
    })
  );

  return {
    isLoading: records === undefined,
    records: records || ([] as RecordsType[]),
    error: error || null,
  };
};
