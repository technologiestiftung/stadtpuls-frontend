import { getSensorData } from "@lib/requests/getSensorData";
import useSWR from "swr";
import { SensorQueryResponseType } from "../usePublicSensors";

const getData = async (
  _key: string,
  sensorId: number
): Promise<SensorQueryResponseType> => getSensorData(sensorId);

export const useSensorData = (
  sensorId: number
): {
  data: SensorQueryResponseType | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<SensorQueryResponseType, Error>(
    [`sensor-${sensorId}`, sensorId],
    getData
  );
  return {
    data: data || null,
    error: error || null,
  };
};
