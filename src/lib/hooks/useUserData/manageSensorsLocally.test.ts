import { definitions } from "@common/types/supabase";
import {
  createSensorLocally,
  updateSensorsLocally,
  deleteSensorLocally,
} from "./manageSensorsLocally";

const createFakeSensor = (id: number): definitions["sensors"] => ({
  id: id,
  created_at: "2021-09-20T00:00Z",
  connection_type: "http",
  category_id: 1,
  user_id: "abcdefg",
});

describe("createSensorLocally", () => {
  it("creates a sensor locally", () => {
    const newSensor = createFakeSensor(5);
    const sensors: definitions["sensors"][] = [
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
    const sensors: definitions["sensors"][] = [
      notYetUpdatedSensor,
      createFakeSensor(14),
      createFakeSensor(255),
    ];

    const updatedSensor: definitions["sensors"] = {
      ...notYetUpdatedSensor,
      category_id: 2,
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
      sensorsWithUpdatedSensor.find(sensor => sensor.id === 75)?.category_id
    ).toEqual(2);
  });
});

describe("deleteSensorLocally", () => {
  it("deletes a sensor locally", () => {
    const sensorIdToBeDeleted = 38;
    const sensorToBeDeleted = createFakeSensor(sensorIdToBeDeleted);
    const sensors: definitions["sensors"][] = [
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
