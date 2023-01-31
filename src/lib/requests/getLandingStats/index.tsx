import { getPublicAccounts } from "../getPublicAccounts";
import { getPublicRecords } from "../getPublicRecords";
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
    getPublicRecords(),
  ]);

  return {
    usersCount: usersReq.count || 0,
    sensorsCount: sensorsReq.count || 0,
    recordsCount: recordsReq.count || 0,
  };
}
