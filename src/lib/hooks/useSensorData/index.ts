import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import useSWR from "swr";
import { getSensorData } from "@lib/requests/getSensorData";

interface useSensorDataParamsType {
  sensorId?: number;
  initialData?: ParsedSensorType;
}

interface useSensorDataReturnType {
  isLoading: boolean;
  sensor: ParsedSensorType | null;
  error: Error | null;
}

export const useSensorData = ({
  sensorId,
  initialData,
}: useSensorDataParamsType): useSensorDataReturnType => {
  const params = [`sensor-${sensorId || "no"}-data`];
  const { data, error } = useSWR<ParsedSensorType | undefined, Error>(
    params,
    () => getSensorData(sensorId),
    { fallbackData: initialData }
  );

  return {
    isLoading: !data && !error,
    sensor: data || null,
    error: error || null,
  };
};
