import { supabase } from "@auth/supabase";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";

const MAX_DOWNLOADABLE_RECORDS = 1e6;
const maxRows = parseInt(
  `${process.env.NEXT_PUBLIC_SUPABASE_MAX_ROWS || "1000"}`,
  10
);
export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
  maxRows?: number;
}

export interface GetRecordsResponseType {
  records: definitions["records"][];
  count: number | null;
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
    .range(prevRecords.length, prevRecords.length + maxRows);

  if (error) throw error;
  if (!records)
    throw new Error(
      `No records found for sensor ID ${sensorId} at range "${
        prevRecords.length
      },${prevRecords.length + maxRows}"`
    );

  const aggregatedRecords = [...prevRecords, ...records];
  if (records.length <= maxRows) return aggregatedRecords;
  if (aggregatedRecords.length >= MAX_DOWNLOADABLE_RECORDS)
    return aggregatedRecords;
  return getAllRecrodsBySensorId(sensorId, aggregatedRecords);
}

export const getRecordsBySensorId = async (
  sensorId: number,
  options?: GetRecordsOptionsType
): Promise<GetRecordsResponseType> => {
  const MAX_ROWS =
    options?.maxRows ||
    Number.parseInt(process.env.NEXT_PUBLIC_SUPABASE_MAX_ROWS as string, 10);

  if (options) {
    switch (true) {
      case !!(options && options.startDate && options.endDate): {
        const {
          data: records,
          error,
          count,
        } = await supabase
          .from<definitions["records"]>("records")
          .select("*", { count: "exact", head: false })
          .limit(MAX_ROWS)
          .eq("sensor_id", sensorId)
          .gte("recorded_at", options.startDate || "")
          .lte("recorded_at", options.endDate || "")
          .order("recorded_at", { ascending: false });
        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);
        return { records, count };
      }

      case !!(options && options.startDate && !options.endDate): {
        const {
          data: records,
          error,
          count,
        } = await supabase
          .from<definitions["records"]>("records")
          .select("*", { count: "exact" })
          .limit(MAX_ROWS)
          .eq("sensor_id", sensorId)
          .gte("recorded_at", options.startDate || "")
          .order("recorded_at", { ascending: false });

        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);
        return { records, count };
      }

      case !!(options && !options.startDate && options.endDate): {
        const {
          data: records,
          error,
          count,
        } = await supabase
          .from<definitions["records"]>("records")
          .select("*", { count: "exact" })
          .limit(MAX_ROWS)
          .eq("sensor_id", sensorId)
          .lte("recorded_at", options.endDate || "")
          .order("recorded_at", { ascending: false });

        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);
        return { records, count };
      }

      default: {
        const {
          data: records,
          error,
          count,
        } = await supabase
          .from<definitions["records"]>("records")
          .select("*", { count: "exact" })
          .limit(MAX_ROWS)
          .eq("sensor_id", sensorId)
          .order("recorded_at", { ascending: false });

        if (error) throw error;
        if (!records) throw new Error(`No records found`);
        return { records, count };
      }
    }
  }
  const records = await getAllRecrodsBySensorId(sensorId);
  return { records, count: records.length };
};
