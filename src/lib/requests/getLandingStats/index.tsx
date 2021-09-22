import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

export interface LandingStatsReturnType {
  usersCount: number;
  sensorsCount: number;
  recordsCount: number;
}

export async function getLandingStats(): Promise<LandingStatsReturnType> {
  const [usersReq, sensorsReq, recordsReq] = await Promise.all([
    supabase
      .from<definitions["user_profiles"]>("user_profiles")
      .select("name", { count: "exact", head: true }),
    supabase
      .from<definitions["sensors"]>("sensors")
      .select("name", { count: "exact", head: true }),
    supabase
      .from<definitions["records"]>("records")
      .select("measurements", { count: "exact", head: true }),
  ]);

  if (usersReq.error) throw usersReq.error;
  if (sensorsReq.error) throw sensorsReq.error;
  if (recordsReq.error) throw recordsReq.error;
  return {
    usersCount: usersReq.count || 0,
    sensorsCount: sensorsReq.count || 0,
    recordsCount: recordsReq.count || 0,
  };
}
