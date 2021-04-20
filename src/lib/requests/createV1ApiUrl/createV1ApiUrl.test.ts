import { createV1ApiUrl } from ".";
describe("utility function createV1ApiUrl", () => {
  it("should include the provided route", () => {
    const url = createV1ApiUrl("/projects");
    expect(url.includes("/projects")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createV1ApiUrl("/projects");
    expect(url.includes("undefined")).toBe(false);
  });
});
