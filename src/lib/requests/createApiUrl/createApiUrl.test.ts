import { createApiUrl } from ".";
describe("utility function createApiUrl", () => {
  it("should include the provided route", () => {
    const url = createApiUrl("/sensors");
    expect(url.includes("/sensors")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createApiUrl("/sensors");
    expect(url.includes("undefined")).toBe(false);
  });
});
