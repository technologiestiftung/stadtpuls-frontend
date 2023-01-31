import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";
import { getPublicSensors } from "../getPublicSensors";
import { getRecordsBySensorId } from "../getRecordsBySensorId";

export const getPublicRecords = async (): Promise<{
  count: number;
  records: definitions["records"][];
}> => {
  const { sensors } = await getPublicSensors();
  const records = [] as definitions["records"][];

  for (const sensor of sensors) {
    const sensorRecords = await getRecordsBySensorId(`${sensor.id}`);
    records.concat(sensorRecords.records);
  }

  return { records, count: records.length };
};
