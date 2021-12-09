import { categories } from "@mocks/supabaseData/categories";
import { SensorWithEditablePropsType } from ".";
import { ParsedSensorType } from "../usePublicSensors";

let lastSensorId = 10000000;

export const updateSensorsLocally = (
  sensors: ParsedSensorType[],
  sensor: ParsedSensorType
): ParsedSensorType[] =>
  sensors.reduce(
    (sensorsAcc, currSensor) => [
      ...sensorsAcc,
      currSensor.id === sensor.id ? { ...currSensor, ...sensor } : currSensor,
    ],
    [] as ParsedSensorType[]
  );

export const deleteSensorLocally = (
  sensors: ParsedSensorType[],
  sensorId: ParsedSensorType["id"]
): ParsedSensorType[] =>
  sensors ? sensors.filter(sensor => sensor.id !== sensorId) : [];

export const createSensorLocally = (
  sensors: ParsedSensorType[],
  sensor: SensorWithEditablePropsType
): ParsedSensorType[] => {
  const sensorsFromSameAuthor = sensors.filter(
    ({ authorId }) => authorId.trim() === sensor.authorId.trim()
  );
  const authorInfo = sensorsFromSameAuthor[0];
  return [
    ...sensors,
    {
      ...sensor,
      name: sensor.name.trim(),
      id: lastSensorId++,
      authorName:
        authorInfo?.authorName?.trim() ||
        authorInfo?.authorUsername?.trim() ||
        "Anonymous",
      authorUsername: authorInfo?.authorUsername?.trim() || "anonymous",
      categoryName: categories[sensor.categoryId - 1].name?.trim(),
      parsedRecords: [],
    },
  ];
};
