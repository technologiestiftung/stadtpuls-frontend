import { supabase } from "@auth/supabase";
import { RecordType } from "@common/interfaces";
import { DevicesType, UserProfilesType } from "@common/types/supabase";

export interface LandingStatsReturnType {
  usersCount: number;
  devicesCount: number;
  recordsCount: number;
}

export async function getLandingStats(): Promise<LandingStatsReturnType> {
  const [usersReq, devicesReq, recordsReq] = await Promise.all([
    supabase
      .from<UserProfilesType>("userprofiles")
      .select("name", { count: "exact", head: true }),
    supabase
      .from<DevicesType>("devices")
      .select("name", { count: "exact", head: true }),
    supabase
      .from<RecordType>("records")
      .select("measurements", { count: "exact", head: true }),
  ]);

  if (usersReq.error) throw usersReq.error;
  if (devicesReq.error) throw devicesReq.error;
  if (recordsReq.error) throw recordsReq.error;
  return {
    usersCount: usersReq.count || 0,
    devicesCount: devicesReq.count || 0,
    recordsCount: recordsReq.count || 0,
  };
}
