// import * as yup from "yup";
import { requiredEmailValidation, requiredUsernameValidation } from ".";

describe("requiredEmailValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredEmailValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if not an email", async () => {
    const isValid = await requiredEmailValidation.isValid("wfefwf[at]fwe.cew");
    expect(isValid).toBe(false);
  });
  it("should be valid if an email", async () => {
    const isValid = await requiredEmailValidation.isValid("wfefwf@fwe.cew");
    expect(isValid).toBe(true);
  });
});

describe("requiredUsernameValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredUsernameValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should be valid if not empty", async () => {
    const isValid = await requiredUsernameValidation.isValid("greatusername");
    expect(isValid).toBe(true);
  });
});
