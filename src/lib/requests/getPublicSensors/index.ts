import {
  ParsedSensorType,
  mapPublicSensor,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { getBaseUrl } from "@lib/urlUtil";

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

export const getPublicSensors = async (): Promise<{
  sensors: ParsedSensorType[];
  count: number;
}> => {
  const response = await fetch(`${getBaseUrl()}/data/sensors.json`);
  try {
    const rawSensors = (await response.json()) as SensorQueryResponseType[];
    const sensors = rawSensors.map(mapPublicSensor);
    return { count: sensors.length, sensors };
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        `There was an error parsing the response of the accounts call`
    );
  }
};
