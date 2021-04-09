const API_VERSION = "v1";

export const createApiUrl = (resource: string): string =>
  `${
    process.env.NEXT_PUBLIC_API_URL || "https://fake-api.com/api/v1"
  }/api/${API_VERSION}${resource}`;
