const TIMESTAMP_REGEX =
  /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])[ |T](2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]Z?$/;

export const isValidTimestamp = (input: string): boolean => {
  return TIMESTAMP_REGEX.test(input);
};

export const VALID_TIMESTAMP_EXAMPLE = "2021-08-05T10:00:00Z";
export const INVALID_TIMESTAMP_EXAMPLES = [
  "2021-08-05T10:90:00Z", // invalid minute
  "2021-98-05T10:00:00Zasassasa",
  "2021-08-05T10:00:00 ", // additional whitespace
  "221-08-05T10:00:00 ",
];
