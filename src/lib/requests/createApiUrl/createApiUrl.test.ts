import { createApiUrl } from ".";
describe("utility function createApiUrl", () => {
  it("should include the provided route", () => {
    const url = createApiUrl("/projects");
    expect(url.includes("/projects")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createApiUrl("/projects");
    expect(url.includes("undefined")).toBe(false);
  });
});
