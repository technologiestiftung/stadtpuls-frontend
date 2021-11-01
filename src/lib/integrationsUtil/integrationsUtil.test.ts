import { integrations } from "./index";
describe("integrationsUtil", () => {
  test("should be an array of strings", () => {
    expect(Array.isArray(integrations)).toBe(true);
    expect(integrations.every(s => typeof s === "string")).toBe(true);
  });
});
