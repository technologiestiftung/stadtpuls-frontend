import { createDateValueArray } from ".";

describe("createDateValueArray", () => {
  it("should return an array", () => {
    const dateValueArray = createDateValueArray([
      {
        id: 1,
        sensor_id: 1,
        recorded_at: "2021-04-08T20:32:49.796Z",
        measurements: [20],
      },
    ]);
    expect(Array.isArray(dateValueArray)).toBe(true);
  });
  it("should return an array of objects with a date containing a Date", () => {
    const dateValueArray = createDateValueArray([
      {
        id: 1,
        sensor_id: 1,
        recorded_at: "2021-04-08T20:32:49.796Z",
        measurements: [20],
      },
    ]);
    expect(dateValueArray[0].date.toISOString()).toBe(
      "2021-04-08T20:32:49.796Z"
    );
  });
  it("should return an array sorted by Date", () => {
    const dateValueArray = createDateValueArray([
      {
        id: 2,
        sensor_id: 1,
        recorded_at: "2021-02-08T20:32:49.796Z",
        measurements: [2],
      },
      {
        id: 3,
        sensor_id: 1,
        recorded_at: "2021-03-08T20:32:49.796Z",
        measurements: [3],
      },
      {
        id: 1,
        sensor_id: 1,
        recorded_at: "2021-01-08T20:32:49.796Z",
        measurements: [1],
      },
    ]);
    expect(dateValueArray[0].value).toBe(1);
    expect(dateValueArray[1].value).toBe(2);
    expect(dateValueArray[2].value).toBe(3);
  });
});
