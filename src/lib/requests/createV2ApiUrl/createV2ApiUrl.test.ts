import { createV2ApiUrl } from ".";
describe("utility function createV2ApiUrl", () => {
  it("should include the provided route", () => {
    const url = createV2ApiUrl("/projects");
    expect(url.includes("/projects")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createV2ApiUrl("/projects");
    expect(url.includes("undefined")).toBe(false);
  });
});
