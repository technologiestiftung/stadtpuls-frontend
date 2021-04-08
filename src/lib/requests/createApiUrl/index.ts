const API_VERSION = "v1";

export const createApiUrl = (resource: string): string =>
  `${process.env.NEXT_PUBLIC_API_URL || ""}/api/${API_VERSION}${resource}`;
