import * as yup from "yup";
import {
  requiredEmailValidation,
  requiredUsernameValidation,
  requiredSensorNameValidation,
  requiredSensorCategoryValidation,
  requiredSensorDescriptionValidation,
  requiredSensorIntegrationValidation,
  requiredTTNDeviceIDValidation,
  requiredLatitude,
  requiredLongitude,
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

describe("requiredSensorNameValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredSensorNameValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if string is longer than 60 chars", async () => {
    const isValid = await requiredSensorNameValidation.isValid(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    );
    expect(isValid).toBe(false);
  });
});

describe("requiredLatitude validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredLatitude.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if outside of latitude boundaries", async () => {
    const below90 = await requiredLatitude.isValid(-91);
    expect(below90).toBe(false);
    const above90 = await requiredLatitude.isValid(91);
    expect(above90).toBe(false);
  });
  it("should be valid if inside of latitude boundaries", async () => {
    const exactly90 = await requiredLatitude.isValid(90);
    expect(exactly90).toBe(true);
    const betweenRange = await requiredLatitude.isValid(13);
    expect(betweenRange).toBe(true);
    const exactlyMinus90 = await requiredLatitude.isValid(-90);
    expect(exactlyMinus90).toBe(true);
  });
});

describe("requiredLongitude validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredLongitude.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if outside of Longitude boundaries", async () => {
    const below90 = await requiredLongitude.isValid(-181);
    expect(below90).toBe(false);
    const above90 = await requiredLongitude.isValid(181);
    expect(above90).toBe(false);
  });
  it("should be valid if inside of Longitude boundaries", async () => {
    const exactly180 = await requiredLongitude.isValid(180);
    expect(exactly180).toBe(true);
    const betweenRange = await requiredLongitude.isValid(-43);
    expect(betweenRange).toBe(true);
    const exactlyMinus180 = await requiredLongitude.isValid(-180);
    expect(exactlyMinus180).toBe(true);
  });
});

describe("requiredSensorCategoryValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredSensorCategoryValidation.isValid("");
    expect(isValid).toBe(false);
  });
});

describe("requiredSensorDescriptionValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredSensorDescriptionValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if less than 10 chars", async () => {
    const isValid = await requiredSensorDescriptionValidation.isValid("abc");
    expect(isValid).toBe(false);
  });
  it("should not be valid if more than 140 chars", async () => {
    const longString =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const isValid = await requiredSensorDescriptionValidation.isValid(
      longString
    );
    expect(isValid).toBe(false);
  });
});

describe("requiredSensorIntegrationValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredSensorIntegrationValidation.isValid("");
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

describe("requiredTTNDeviceIDValidation validation", () => {
  const formSchema = yup.object().shape({
    integration: requiredSensorIntegrationValidation,
    ttnDeviceId: requiredTTNDeviceIDValidation,
  });
  it("should not be valid if empty and integration is ttn", async () => {
    const isValid = await formSchema.isValid({
      integration: "ttn",
      ttnDeviceId: "",
    });
    expect(isValid).toBe(false);
  });
  it("should be valid if empty and integration is http", async () => {
    const isValid = await formSchema.isValid({
      integration: "http",
      ttnDeviceId: "",
    });
    expect(isValid).toBe(true);
  });
});
