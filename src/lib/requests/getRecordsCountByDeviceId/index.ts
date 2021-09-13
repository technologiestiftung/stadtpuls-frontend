import { supabase } from "@auth/supabase";
import { RecordsType } from "@common/types/supabase_DEPRECATED";

export const getRecordsCountByDeviceId = async (
  deviceId: number
): Promise<number | null> => {
  const { count, error } = await supabase
    .from<RecordsType>("records")
    .select("*", { count: "exact", head: true })
    .eq("deviceId", deviceId);

  if (error) throw error;
  return count || null;
};
