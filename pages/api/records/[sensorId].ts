import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

type PublicRecordsResponseType =
  | {
      error: string;
    }
  | {
      records: definitions["records"][];
      count: number;
    };

const getRecordsBySensorId = async (
  sensorId: string
): Promise<PublicRecordsResponseType> => {
  const basePath = path.join(process.cwd(), "json");
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicRecordsResponseType>
) {
  try {
    const sensorId = req.query.sensorId;
    if (typeof sensorId !== "string") return { count: 0, records: [] };
    const result = await getRecordsBySensorId(sensorId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
