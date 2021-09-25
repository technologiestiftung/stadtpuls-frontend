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
  sensor: Omit<ParsedSensorType, "id">
): ParsedSensorType[] => {
  return [
    ...sensors,
    {
      ...sensor,
      id: lastSensorId++,
    },
  ];
};
