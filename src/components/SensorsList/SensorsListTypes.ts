export interface SensorType {
  id: number;
  externalId: string;
  name: string;
  lastRecordedAt?: Date | null;
}

export type SubmissionDataType = Omit<SensorType, "lastRecordedAt">;
