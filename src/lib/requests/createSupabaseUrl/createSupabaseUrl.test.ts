import { createSupabaseUrl } from ".";
describe("utility function createSupabaseUrl", () => {
  it("should include the provided route", () => {
    const url = createSupabaseUrl("/sensors");
    expect(url.includes("/sensors")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createSupabaseUrl("/sensors");
    expect(url.includes("undefined")).toBe(false);
  });
});
