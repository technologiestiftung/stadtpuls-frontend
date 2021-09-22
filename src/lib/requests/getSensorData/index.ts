import { supabase } from "@auth/supabase";
import {
  mapPublicSensor,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";

export const getSensorData = async (
  sensorId: number
): Promise<SensorQueryResponseType> => {
  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(
      `
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
        records (
          recorded_at,
          measurements
        ),
        user:user_id (
          name,
          display_name
        ),
        category:category_id (
          id,
          name
        )
      `
    )
    .eq("id", sensorId)
    .single();

  if (error) throw error;
  if (!data) throw new Error(`Sensor with id "${sensorId}" was not found`);
  const sensor = mapPublicSensor(data);
  return sensor;
};
