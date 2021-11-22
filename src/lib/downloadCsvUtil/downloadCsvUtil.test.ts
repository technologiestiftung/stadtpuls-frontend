import { downloadCSVString } from ".";

describe("downloadCSV", () => {
  it("should not throw without title", () => {
    expect(() => downloadCSVString("CONTENT")).not.toThrowError();
  });
  it("should not throw with title", () => {
    expect(() => downloadCSVString("CONTENT", "TITLE")).not.toThrowError();
  });
});
