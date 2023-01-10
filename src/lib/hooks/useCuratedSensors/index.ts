import useSWR from "swr";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { getPublicSensors } from "@lib/requests/getPublicSensors";
import { getSensorsRecords } from "@lib/requests/getSensorsRecords";

// The following is a quickfix because we currently know what our curated sensors are
// In the future we might wanna save them in a DB table
// TODO: Refactor this!
const isProduction =
  process.env["NODE_ENV"] === "production" &&
  process.env["VERCEL_ENV"] !== "preview";
const SENSORS_IDS = [22, 23, 24, 25, 27, 28, 29];

export const getCuratedSensorImageById = (id: number): string => {
  if (isProduction) return `/images/sensors/${id}.jpeg`;
  const indexOfId = SENSORS_IDS.indexOf(id);
  return `/images/sensors/${SENSORS_IDS[indexOfId]}.jpeg`;
};

export const getCuratedSensors = async (): Promise<ParsedSensorType[]> => {
  const { sensors } = await getPublicSensors();
  const sensorsRecordsMap = await getSensorsRecords(
    sensors.map(({ id }) => id)
  );
  const curated = sensors
    .filter(sensor => SENSORS_IDS.includes(sensor.id))
    .map(sensor => ({
      ...sensor,
      parsedRecords: (sensorsRecordsMap[sensor.id] || []).slice(-500),
    }));

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
