import { getBaseUrl } from "@lib/urlUtil";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";

export interface GetRecordsResponseType {
  records: definitions["records"][];
  count: number | null;
}

export const getRecordsBySensorId = async (
  sensorId: number
): Promise<GetRecordsResponseType> => {
  const response = await fetch(`${getBaseUrl()}/data/records/${sensorId}.json`);
  if (response.status === 404) return { count: 0, records: [] };
  try {
    const records = (await response.json()) as definitions["records"][];
    return { count: records.length, records: records || [] };
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        `There was an error parsing the response of the records call`
    );
  }
};
