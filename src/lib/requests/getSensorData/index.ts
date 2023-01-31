import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { getPublicSensors } from "../getPublicSensors";

export const getSensorData = async (
  sensorId?: number
): Promise<ParsedSensorType | undefined> => {
  if (!sensorId) return undefined;
  const { sensors } = await getPublicSensors();
  const data = sensors.find(sensor => sensor.id === sensorId);
  if (!data) throw new Error(`Sensor with id "${sensorId}" was not found`);
  return data;
};
