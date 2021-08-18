import { supabase } from "@auth/supabase";
import { RecordsType } from "@common/types/supabase";

export const getDeviceLastRecordDate = async (
  deviceId: number
): Promise<string | undefined> => {
  const { data: records, error } = await supabase
    .from<Pick<RecordsType, "id" | "recordedAt" | "deviceId">>("records")
    .select("id,recordedAt")
    .eq("deviceId", deviceId)
    .order("recordedAt", { ascending: false })
    .limit(1);

  if (error) throw error;
  if (!records) throw new Error(`No record found for device ID ${deviceId}`);
  return records[0]?.recordedAt;
};
