import { definitions } from "@common/types/supabase";

let lastSensorId = 10000000;

export const updateSensorsLocally = (
  sensors: definitions["sensors"][],
  sensor: definitions["sensors"]
): definitions["sensors"][] =>
  sensors.reduce(
    (sensorsAcc, currSensor) => [
      ...sensorsAcc,
      currSensor.id === sensor.id ? sensor : currSensor,
    ],
    [] as definitions["sensors"][]
  );

export const deleteSensorLocally = (
  sensors: definitions["sensors"][],
  sensorId: definitions["sensors"]["id"]
): definitions["sensors"][] =>
  sensors ? sensors.filter(sensor => sensor.id !== sensorId) : [];

export const createSensorLocally = (
  sensors: definitions["sensors"][],
  sensor: Omit<definitions["sensors"], "id">
): definitions["sensors"][] => {
  return [
    ...sensors,
    {
      ...sensor,
      id: lastSensorId++,
    },
  ];
};
