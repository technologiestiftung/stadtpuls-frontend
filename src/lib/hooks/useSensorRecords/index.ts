import { definitions } from "@common/types/supabase";
import {
  getRecordsBySensorId,
  GetRecordsResponseType,
} from "@lib/requests/getRecordsBySensorId";
import useSWR from "swr";

interface useSensorRecordsParamsType {
  sensorId: number | undefined;
  startDateString?: string;
  endDateString?: string;
  maxRows?: number;
}

interface useSensorRecordsReturnType {
  isLoading: boolean;
  records: definitions["records"][];
  recordsCount: number | null;
  error: Error | null;
}

type fetchSensorRecordsSignature = (
  params: useSensorRecordsParamsType
) => Promise<GetRecordsResponseType>;

const fetchSensorRecords: fetchSensorRecordsSignature = async ({
  sensorId,
  startDateString,
  endDateString,
  maxRows,
}) => {
  if (!sensorId) return { records: [], count: null };

  const { records, count } = await getRecordsBySensorId(sensorId, {
    startDate: startDateString,
    endDate: endDateString,
    maxRows: maxRows,
  });

  return { records, count };
};

export const useSensorRecords = ({
  sensorId,
  startDateString,
  endDateString,
  maxRows,
}: useSensorRecordsParamsType): useSensorRecordsReturnType => {
  const params = [
    `sensor-${sensorId || "no"}-records`,
    sensorId,
    startDateString,
    endDateString,
    maxRows,
  ];
  const { data, error } = useSWR<GetRecordsResponseType, Error>(params, () =>
    fetchSensorRecords({
      sensorId,
      startDateString,
      endDateString,
      maxRows,
    })
  );

  return {
    isLoading: data?.records === undefined,
    records: data?.records || ([] as definitions["records"][]),
    recordsCount: data?.count || null,
    error: error || null,
  };
};
