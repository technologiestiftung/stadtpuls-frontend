import { createTokenApiUrl } from ".";
describe("utility function createTokenApiUrl", () => {
  it("should include the authtokens route", () => {
    const url = createTokenApiUrl();
    expect(url.includes("/api/v3/authtokens")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createTokenApiUrl();
    expect(url.includes("undefined")).toBe(false);
  });
  it("should include the provided parameters", () => {
    const url = createTokenApiUrl({ thisIsSo: "cool" });
    expect(url.includes("?thisIsSo=cool")).toBe(true);
  });
});
