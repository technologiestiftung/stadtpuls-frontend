import { supabase } from "@auth/supabase";
import {
  mapPublicSensor,
  sensorQueryString,
  ParsedSensorType,
  SensorQueryResponseType,
  RECORDS_LIMIT,
} from "@lib/hooks/usePublicSensors";

export const getSensorData = async (
  sensorId: number
): Promise<ParsedSensorType> => {
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    // FIXME: created_at is not recognized altought it is inherited from the definitions
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .order("recorded_at", {
      foreignTable: "records",
      ascending: false,
    })
    .limit(RECORDS_LIMIT, { foreignTable: "records" })
    .eq("id", sensorId)
    .single();

  if (error) throw error;
  if (!data) throw new Error(`Sensor with id "${sensorId}" was not found`);
  const sensor = mapPublicSensor(data);
  return sensor;
};
