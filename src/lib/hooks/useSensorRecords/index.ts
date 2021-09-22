import { definitions } from "@common/types/supabase";
import { getRecordsBySensorId } from "@lib/requests/getRecordsBySensorId";
import useSWR from "swr";

interface useSensorRecordsParamsType {
  sensorId: number | undefined;
  startDateString?: string;
  endDateString?: string;
}

interface useSensorRecordsReturnType {
  isLoading: boolean;
  records: definitions["records"][];
  error: Error | null;
}

type fetchSensorRecordsSignature = (
  params: useSensorRecordsParamsType
) => Promise<definitions["records"][]>;

const fetchSensorRecords: fetchSensorRecordsSignature = async ({
  sensorId,
  startDateString,
  endDateString,
}) => {
  if (!sensorId) return [];

  const records = await getRecordsBySensorId(sensorId, {
    startDate: startDateString,
    endDate: endDateString,
  });
  return records;
};

export const useSensorRecords = ({
  sensorId,
  startDateString,
  endDateString,
}: useSensorRecordsParamsType): useSensorRecordsReturnType => {
  const params = [
    `sensor-${sensorId || "no"}-records`,
    sensorId,
    startDateString,
    endDateString,
  ];
  const { data: records, error } = useSWR<definitions["records"][], Error>(
    params,
    () =>
      fetchSensorRecords({
        sensorId,
        startDateString,
        endDateString,
      })
  );

  return {
    isLoading: records === undefined,
    records: records || ([] as definitions["records"][]),
    error: error || null,
  };
};
