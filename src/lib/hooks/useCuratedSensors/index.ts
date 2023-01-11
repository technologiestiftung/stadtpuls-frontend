import useSWR from "swr";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { getPublicSensors } from "@lib/requests/getPublicSensors";
import { SENSORS_IDS } from "@lib/getCuratedSensorImageById";

export const getCuratedSensors = async (): Promise<ParsedSensorType[]> => {
  const { sensors } = await getPublicSensors();
  const curated = sensors.filter(sensor => SENSORS_IDS.includes(sensor.id));

  return curated;
};

export const useCuratedSensors = (): {
  data: ParsedSensorType[] | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<ParsedSensorType[], Error>(
    "useCuratedSensors",
    getCuratedSensors
  );

  return {
    data: error ? null : data || null,
    error: error || null,
  };
};
