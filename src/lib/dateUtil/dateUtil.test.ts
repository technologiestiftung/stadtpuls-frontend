import { createTimeOutput, createDateValueArray } from ".";

describe("createDateValueArray", () => {
  it("should return an array", () => {
    const dateValueArray = createDateValueArray([
      {
        id: 1,
        deviceId: 1,
        recordedAt: "2021-04-08T20:32:49.796Z",
        value: 20,
      },
    ]);
    expect(Array.isArray(dateValueArray)).toBe(true);
  });
  it("should return an array of objects with a date containing a Date", () => {
    const dateValueArray = createDateValueArray([
      {
        id: 1,
        deviceId: 1,
        recordedAt: "2021-04-08T20:32:49.796Z",
        value: 20,
      },
    ]);
    expect(dateValueArray[0].date).toBeInstanceOf(Date);
  });
  it("should return an array sorted by Date", () => {
    const dateValueArray = createDateValueArray([
      {
        id: 2,
        deviceId: 1,
        recordedAt: "2021-02-08T20:32:49.796Z",
        value: 2,
      },
      {
        id: 3,
        deviceId: 1,
        recordedAt: "2021-03-08T20:32:49.796Z",
        value: 3,
      },
      {
        id: 1,
        deviceId: 1,
        recordedAt: "2021-01-08T20:32:49.796Z",
        value: 1,
      },
    ]);
    expect(dateValueArray[0].value).toBe(1);
    expect(dateValueArray[1].value).toBe(2);
    expect(dateValueArray[2].value).toBe(3);
  });
});

describe("createTimeOutput", () => {
  it("should format a timestamp into a string", () => {
    const formatttedTime = createTimeOutput(
      new Date("2021-01-08T20:32:49.796Z")
    );
    expect(formatttedTime).toBe("20:32:49");
  });
  it("should add leading 0 to every unit", () => {
    const formatttedTime = createTimeOutput(
      new Date("2021-01-08T01:02:03.796Z")
    );
    expect(formatttedTime).toBe("01:02:03");
  });
});
