import { createCSVStructure, downloadCSV } from ".";

const createFakeData = (
  amount: number
): {
  id: number;
  sensor_id: number;
  recorded_at: string;
  measurements?: number[];
}[] =>
  [...new Array(amount || 1).map((_, idx: number) => idx)].map(
    (_, idx: number) => ({
      id: idx + amount,
      sensor_id: idx + amount,
      recorded_at: "2021-04-08T13:23:04.753Z",
      measurements: [idx * 10 + amount],
    })
  );
describe("createCSVStructure", () => {
  it("should return without input", () => {
    const csvString = createCSVStructure(undefined);
    expect(csvString.split(/\r\n|\r|\n/).length).toBe(2);
  });
  it("should include a header", () => {
    const csvString = createCSVStructure([]);
    expect(csvString.includes("id,recorded_at,value")).toBe(true);
  });
  it("should create a csv row with data", () => {
    const csvString = createCSVStructure([
      {
        id: 1,
        sensor_id: 3,
        recorded_at: "2021-01-08T20:32:49.796Z",
        measurements: [20],
      },
    ]);
    expect(csvString.includes("1,2021-01-08T20:32:49.796Z,20")).toBe(true);
  });
  it("should create as many rows as records provided", () => {
    const fakeRecords = createFakeData(4);
    const csvString = createCSVStructure(fakeRecords);
    expect(csvString.split(/\r\n|\r|\n/).length).toBe(fakeRecords.length + 2);
  });
});

describe("downloadCSV", () => {
  it("should not throw without title", () => {
    expect(() => downloadCSV("CONTENT")).not.toThrowError();
  });
  it("should not throw with title", () => {
    expect(() => downloadCSV("CONTENT", "TITLE")).not.toThrowError();
  });
});
