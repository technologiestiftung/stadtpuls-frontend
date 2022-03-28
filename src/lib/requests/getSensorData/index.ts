import { supabase } from "@auth/supabase";
import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { sensorQueryString } from "../getPublicSensors";

export const getSensorData = async (
  sensorId?: number
): Promise<ParsedSensorType | undefined> => {
  if (!sensorId) return undefined;
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    .eq("id", sensorId)
    .single();

  if (error) throw error;
  if (!data) throw new Error(`Sensor with id "${sensorId}" was not found`);
  const sensor = mapPublicSensor(data);
  return sensor;
};
