import {
  ParsedSensorType,
  mapPublicSensor,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { getBaseUrl } from "@lib/urlUtil";

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
