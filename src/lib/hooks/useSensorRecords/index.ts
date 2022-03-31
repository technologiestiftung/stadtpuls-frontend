import { supabase } from "@auth/supabase";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import {
  getRecordsBySensorId,
  GetRecordsResponseType,
} from "@lib/requests/getRecordsBySensorId";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { useAuth } from "@auth/Auth";

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
  deleteRecords: (recordIds: number[]) => Promise<void>;
}

const deleteRecords = async (
  ids: definitions["records"]["id"][],
  user_id: string | undefined
): Promise<void> => {
  if (!user_id) throw new Error("Not authenticated");
  if (!ids || ids.length === 0) throw new Error("Please provide record ids");

  const { error } = await supabase
    .from<definitions["records"]>("records")
    .delete()
    .in("id", ids);

  if (error) throw error;
};

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
  const { authenticatedUser } = useAuth();
  const userId = authenticatedUser?.id;
  const [actionError, setActionError] = useState<Error | null>(null);
  const params = [
    `sensor-${sensorId || "no"}-records`,
    sensorId,
    startDateString,
    endDateString,
    maxRows,
  ];
  const { data, error } = useSWR<GetRecordsResponseType, Error>(
    params,
    () =>
      fetchSensorRecords({
        sensorId,
        startDateString,
        endDateString,
        maxRows,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    isLoading: data?.records === undefined,
    records: data?.records || [],
    recordsCount: data?.count || null,
    error: error || actionError || null,
    deleteRecords: async recordIds => {
      if (!data || error) return;
      if (!recordIds || recordIds.length === 0) {
        setActionError(() => new Error("Please provide record ids"));
        return;
      }
      setActionError(null);
      void mutate(
        params,
        data.records.filter(({ id }) => !recordIds.includes(id)),
        false
      );
      await deleteRecords(recordIds, userId).catch(setActionError);
      void mutate(params);
    },
  };
};
