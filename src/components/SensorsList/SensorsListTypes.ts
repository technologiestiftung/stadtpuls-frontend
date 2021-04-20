export interface SensorType {
  id: string | number;
  externalId: string | number;
  name: string;
  lastRecordedAt?: Date | null;
}

export type SubmissionDataType = Omit<SensorType, "lastRecordedAt">;
