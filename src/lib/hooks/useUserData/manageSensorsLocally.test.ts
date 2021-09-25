import { parsedSensors } from "@mocks/supabaseData/sensors";
import { ParsedSensorType } from "../usePublicSensors";
import {
  createSensorLocally,
  updateSensorsLocally,
  deleteSensorLocally,
} from "./manageSensorsLocally";

const createFakeSensor = (id: number): ParsedSensorType => ({
  ...parsedSensors[0],
  id: id,
});

describe("createSensorLocally", () => {
  it("creates a sensor locally", () => {
    const newSensor = createFakeSensor(5);
    const sensors: ParsedSensorType[] = [
      createFakeSensor(14),
      createFakeSensor(255),
    ];
    const sensorsWithNewlyCreatedSensor = createSensorLocally(
      sensors,
      newSensor
    );

    expect(
      sensorsWithNewlyCreatedSensor.some(sensor => sensor.id === 10000000)
    ).toBe(true);
  });
});

describe("updateSensorLocally", () => {
  it("updates a sensor locally", () => {
    const notYetUpdatedSensor = createFakeSensor(75);
    const sensors: ParsedSensorType[] = [
      notYetUpdatedSensor,
      createFakeSensor(14),
      createFakeSensor(255),
    ];

    const updatedSensor: ParsedSensorType = {
      ...notYetUpdatedSensor,
      categoryId: 2,
    };

    const sensorsWithUpdatedSensor = updateSensorsLocally(
      sensors,
      updatedSensor
    );

    const updatedSensorIsIncluded = !!sensorsWithUpdatedSensor.find(
      sensor => sensor.id === 75
    );

    expect(updatedSensorIsIncluded).toBe(true);
    expect(
      sensorsWithUpdatedSensor.find(sensor => sensor.id === 75)?.categoryId
    ).toEqual(2);
  });
});

describe("deleteSensorLocally", () => {
  it("deletes a sensor locally", () => {
    const sensorIdToBeDeleted = 38;
    const sensorToBeDeleted = createFakeSensor(sensorIdToBeDeleted);
    const sensors: ParsedSensorType[] = [
      sensorToBeDeleted,
      createFakeSensor(14),
      createFakeSensor(255),
    ];
    const sensorsWithoutDeletedSensor = deleteSensorLocally(
      sensors,
      sensorIdToBeDeleted
    );
    expect(sensorsWithoutDeletedSensor.length).toEqual(2);
    expect(sensorsWithoutDeletedSensor[0]).not.toStrictEqual(sensorToBeDeleted);
  });
});
