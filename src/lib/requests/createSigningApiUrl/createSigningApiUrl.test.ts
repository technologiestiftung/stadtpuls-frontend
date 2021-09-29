import { createSigningApiUrl } from ".";
describe("utility function createSigningApiUrl", () => {
  it("should include the provided route", () => {
    const url = createSigningApiUrl("signin");
    expect(url.includes("/signin")).toBe(true);
  });
  it("should not include undefined", () => {
    const url = createSigningApiUrl("signup");
    expect(url.includes("undefined")).toBe(false);
  });
});
