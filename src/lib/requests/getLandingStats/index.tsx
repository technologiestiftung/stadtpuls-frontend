import { supabase } from "@auth/supabase";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { getPublicAccounts } from "../getPublicAccounts";
import { getPublicSensors } from "../getPublicSensors";

export interface LandingStatsReturnType {
  usersCount: number;
  sensorsCount: number;
  recordsCount: number;
}

export async function getLandingStats(): Promise<LandingStatsReturnType> {
  const [usersReq, sensorsReq, recordsReq] = await Promise.all([
    getPublicAccounts(),
    getPublicSensors(),
    supabase
      .from<definitions["records"]>("records")
      .select("measurements", { count: "exact", head: true }),
  ]);

  if (recordsReq.error) throw recordsReq.error;
  return {
    usersCount: usersReq.count || 0,
    sensorsCount: sensorsReq.count || 0,
    recordsCount: recordsReq.count || 0,
  };
}
