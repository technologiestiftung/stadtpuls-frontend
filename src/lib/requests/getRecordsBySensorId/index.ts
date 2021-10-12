import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
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
  } else {
    const { data: records, error } = await supabase
      .from<definitions["records"]>("records")
      .select("*")
      .eq("sensor_id", sensorId)
      .order("recorded_at", { ascending: false });

    if (error) throw error;
    if (!records) throw new Error(`No records found for sensor ID ${sensorId}`);
    return records;
  }
};
