import {
  isValidTimestamp,
  VALID_TIMESTAMP_EXAMPLE,
  INVALID_TIMESTAMP_EXAMPLES,
} from ".";

describe("isValidTimestamp util", () => {
  it("should return true with valid timestamp", () => {
    expect(isValidTimestamp(VALID_TIMESTAMP_EXAMPLE)).toBe(true);
  });
  it("should return false with invalid timestamps", () => {
    INVALID_TIMESTAMP_EXAMPLES.forEach(invalidTimestamp => {
      expect(isValidTimestamp(invalidTimestamp)).toBe(false);
    });
  });
});
