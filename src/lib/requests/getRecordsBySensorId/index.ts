import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import path from "path";
import { promises as fs } from "fs";

export interface GetRecordsResponseType {
  records: definitions["records"][];
  count: number | null;
}

export const getRecordsBySensorId = async (
  sensorId: string
): Promise<GetRecordsResponseType> => {
  const basePath = path.join(process.cwd(), "public/data");
  let response;
  try {
    response = await fs.readFile(
      `${basePath}/records/${sensorId}.json`,
      "utf8"
    );
  } catch (error) {
    console.error(error);
    return { count: 0, records: [] };
  }
  try {
    const records = JSON.parse(response) as definitions["records"][];
    return { count: records.length, records };
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        `There was an error parsing the response of the accounts call`
    );
  }
};
