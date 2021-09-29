import { createApiUrl } from ".";
describe("utility function createApiUrl", () => {
  it("should include the authtokens route", () => {
    const url = createApiUrl("/authtokens");
    expect(url.includes("/api/v3/authtokens")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createApiUrl();
    expect(url.includes("undefined")).toBe(false);
  });
  it("should include the provided parameters", () => {
    const url = createApiUrl(undefined, { thisIsSo: "cool" });
    expect(url.includes("?thisIsSo=cool")).toBe(true);
  });
});
