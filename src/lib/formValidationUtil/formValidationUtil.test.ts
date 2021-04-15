// import * as yup from "yup";
import {
  requiredEmailValidation,
  requiredUsernameValidation,
  requiredProjectTitleValidation,
  requiredProjectCategoryValidation,
  requiredProjectDescriptionValidation,
  requiredProjectIntegrationValidation,
} from ".";

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

describe("requiredProjectTitleValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredProjectTitleValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if string is longer than 60 chars", async () => {
    const isValid = await requiredProjectTitleValidation.isValid(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    );
    expect(isValid).toBe(false);
  });
});

describe("requiredProjectCategoryValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredProjectCategoryValidation.isValid("");
    expect(isValid).toBe(false);
  });
});

describe("requiredProjectDescriptionValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredProjectDescriptionValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if less than 10 chars", async () => {
    const isValid = await requiredProjectDescriptionValidation.isValid("abc");
    expect(isValid).toBe(false);
  });
  it("should not be valid if more than 140 chars", async () => {
    const longString =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const isValid = await requiredProjectDescriptionValidation.isValid(
      longString
    );
    expect(isValid).toBe(false);
  });
});

describe("requiredProjectIntegrationValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredProjectIntegrationValidation.isValid("");
    expect(isValid).toBe(false);
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
