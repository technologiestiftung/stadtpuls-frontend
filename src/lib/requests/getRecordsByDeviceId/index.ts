import { supabase } from "@auth/supabase";
import { RecordsType } from "@common/types/supabase";

export const getRecordsByDeviceId = async (
  deviceId: number
): Promise<RecordsType[]> => {
  const { data: records, error } = await supabase
    .from<RecordsType>("records")
    .select("*")
    .eq("deviceId", deviceId);

  if (error) throw error;
  if (!records) throw new Error(`No records found for device ID ${deviceId}`);
  return records;
};
