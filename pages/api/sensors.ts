import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

type PublicSensorsResponseType =
  | {
      error: string;
    }
  | {
      sensors: ParsedSensorType[];
      count: number;
    };

const getPublicSensors = async (): Promise<PublicSensorsResponseType> => {
  const basePath = path.join(process.cwd(), "json");
  const response = await fs.readFile(`${basePath}/sensors.json`, "utf8");
  try {
    const rawSensors = JSON.parse(response) as SensorQueryResponseType[];
    const sensors = rawSensors.map(mapPublicSensor);
    return { count: sensors.length, sensors };
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        `There was an error parsing the response of the accounts call`
    );
  }
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PublicSensorsResponseType>
) {
  try {
    const result = await getPublicSensors();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
