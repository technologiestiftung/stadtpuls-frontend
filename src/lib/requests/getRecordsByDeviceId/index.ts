import { supabase } from "@auth/supabase";
import { RecordsType } from "@common/types/supabase";

export interface GetRecordsOptionsType {
  startDate?: string;
  endDate?: string;
}

export const getRecordsByDeviceId = async (
  deviceId: number,
  options?: GetRecordsOptionsType
): Promise<RecordsType[]> => {
  if (options) {
    switch (true) {
      case !!(options && options.startDate && options.endDate): {
        const { data: records, error } = await supabase
          .from<RecordsType>("records")
          .select("*")
          .eq("deviceId", deviceId)
          .gte("recordedAt", options.startDate)
          .lte("recordedAt", options.endDate);
        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);

        return records;
      }

      case !!(options && options.startDate && !options.endDate): {
        const { data: records, error } = await supabase
          .from<RecordsType>("records")
          .select("*")
          .eq("deviceId", deviceId)
          .gte("recordedAt", options.startDate);

        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);
        return records;
      }

      case !!(options && !options.startDate && options.endDate): {
        const { data: records, error } = await supabase
          .from<RecordsType>("records")
          .select("*")
          .eq("deviceId", deviceId)
          .lte("recordedAt", options.endDate);

        if (error) throw error;
        if (!records) throw new Error(`No records found for this time range`);
        return records;
      }

      default: {
        const { data: records, error } = await supabase
          .from<RecordsType>("records")
          .select("*")
          .eq("deviceId", deviceId);

        if (error) throw error;
        if (!records) throw new Error(`No records found`);
        return records;
      }
    }
  } else {
    const { data: records, error } = await supabase
      .from<RecordsType>("records")
      .select("*")
      .eq("deviceId", deviceId);

    if (error) throw error;
    if (!records) throw new Error(`No records found for device ID ${deviceId}`);
    return records;
  }
};
