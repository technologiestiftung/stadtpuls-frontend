import { RecordType } from "@common/interfaces";
import { createCSVStructure, downloadCSV, downloadMultiple } from ".";

const createFakeData = (amount: number): RecordType[] =>
  [...new Array(amount || 1).map((_, idx: number) => idx)].map(
    (_, idx: number) => ({
      id: idx + amount,
      deviceId: idx + amount,
      recordedAt: "2021-04-08T13:23:04.753Z",
      value: idx * 10 + amount,
    })
  );
describe("createCSVStructure", () => {
  it("should return without input", () => {
    const csvString = createCSVStructure(undefined);
    expect(csvString.split(/\r\n|\r|\n/).length).toBe(2);
  });
  it("should include a header", () => {
    const csvString = createCSVStructure([]);
    expect(csvString.includes("id,deviceId,recordedAt,value")).toBe(true);
  });
  it("should create a csv row with deviceId", () => {
    const csvString = createCSVStructure([
      {
        id: 1,
        deviceId: 2,
        recordedAt: "2021-01-08T20:32:49.796Z",
        value: 20,
      },
    ]);
    expect(csvString.includes("1,2,2021-01-08T20:32:49.796Z,20")).toBe(true);
  });
  it("should create a csv row without deviceId", () => {
    const csvString = createCSVStructure([
      {
        id: 1,
        deviceId: undefined,
        recordedAt: "2021-01-08T20:32:49.796Z",
        value: 20,
      },
    ]);
    expect(csvString.includes("1,,2021-01-08T20:32:49.796Z,20")).toBe(true);
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

describe("downloadMultiple", () => {
  it("should not throw", () => {
    expect(() =>
      downloadMultiple(
        [createFakeData(2), createFakeData(4)],
        ["TITLE1", "TITLE2"]
      )
    ).not.toThrowError();
  });
});
