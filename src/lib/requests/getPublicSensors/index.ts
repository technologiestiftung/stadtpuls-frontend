import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import path from "path";
import { promises as fs } from "fs";

export const sensorQueryString = `
  id,
  name,
  created_at,
  connection_type,
  external_id,
  description,
  location,
  latitude,
  longitude,
  altitude,
  category_id,
  icon_id,
  user_id,
  user:user_profiles!user_id (
    name,
    display_name
  ),
  category:category_id (
    id,
    name
  )
`;

type SensorsResponseType = {
  sensors: ParsedSensorType[];
  count: number;
};

export const getPublicSensors = async (): Promise<SensorsResponseType> => {
  const basePath = path.join(process.cwd(), "public/data");
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
