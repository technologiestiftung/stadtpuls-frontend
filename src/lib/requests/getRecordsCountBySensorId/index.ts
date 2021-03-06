import { supabase } from "@auth/supabase";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";

export const getRecordsCountBySensorId = async (
  sensorId: number
): Promise<number | null> => {
  const { count, error } = await supabase
    .from<definitions["records"]>("records")
    .select("*", { count: "exact", head: true })
    .eq("sensor_id", sensorId);

  if (error) throw error;
  return count || null;
};
