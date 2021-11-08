import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

const MAX_DOWNLOADABLE_RECORDS = 1000000;
const NEXT_PUBLIC_SUPABASE_MAX_ROWS = 5;

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
}

async function getAllRecrodsBySensorId(
  sensorId: number,
  prevRecords: definitions["records"][] = []
): Promise<definitions["records"][]> {
  const { data: records, error } = await supabase
    .from<definitions["records"]>("records")
    .select("*")
    .eq("sensor_id", sensorId)
    .order("recorded_at", { ascending: false })
    .range(
      prevRecords.length,
      prevRecords.length + NEXT_PUBLIC_SUPABASE_MAX_ROWS
    );

  if (error) throw error;
  if (!records)
    throw new Error(
      `No records found for sensor ID ${sensorId} at range "${
        prevRecords.length
      },${prevRecords.length + NEXT_PUBLIC_SUPABASE_MAX_ROWS}"`
    );

  const aggregatedRecords = [...prevRecords, ...records];
  if (records.length <= NEXT_PUBLIC_SUPABASE_MAX_ROWS) return aggregatedRecords;
  if (aggregatedRecords.length >= MAX_DOWNLOADABLE_RECORDS)
    return aggregatedRecords;
  return getAllRecrodsBySensorId(sensorId, aggregatedRecords);
}

export const getRecordsBySensorId = async (
  sensorId: number,
  options?: GetRecordsOptionsType
): Promise<definitions["records"][]> => {
  if (options) {
    switch (true) {
      case !!(options && options.startDate && options.endDate): {
        const { data: records, error } = await supabase
          .from<definitions["records"]>("records")
          .select("*")
          .eq("sensor_id", sensorId)
          .gte("recorded_at", options.startDate)
          .lte("recorded_at", options.endDate)
          .order("recorded_at", { ascending: false });
        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);

        return records;
      }

      case !!(options && options.startDate && !options.endDate): {
        const { data: records, error } = await supabase
          .from<definitions["records"]>("records")
          .select("*")
          .eq("sensor_id", sensorId)
          .gte("recorded_at", options.startDate)
          .order("recorded_at", { ascending: false });

        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);
        return records;
      }

      case !!(options && !options.startDate && options.endDate): {
        const { data: records, error } = await supabase
          .from<definitions["records"]>("records")
          .select("*")
          .eq("sensor_id", sensorId)
          .lte("recorded_at", options.endDate)
          .order("recorded_at", { ascending: false });

        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);
        return records;
      }

      default: {
        const { data: records, error } = await supabase
          .from<definitions["records"]>("records")
          .select("*")
          .eq("sensor_id", sensorId)
          .order("recorded_at", { ascending: false });

        if (error) throw error;
        if (!records) throw new Error(`No records found`);
        return records;
      }
    }
  }
  return await getAllRecrodsBySensorId(sensorId);
};
