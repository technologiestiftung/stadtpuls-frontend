import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

export const getSensorLastRecordDate = async (
  sensorId: number
): Promise<string | undefined> => {
  const { data: records, error } = await supabase
    .from<Pick<definitions["records"], "id" | "recorded_at" | "sensor_id">>(
      "records"
    )
    .select("id,recorded_at")
    .eq("sensor_id", sensorId)
    .order("recorded_at", { ascending: false })
    .limit(1);

  if (error) throw error;
  if (!records) throw new Error(`No record found for sensor ID ${sensorId}`);
  return records[0]?.recorded_at;
};
