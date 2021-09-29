const API_VERSION = "v3";

export const createSigningApiUrl = (resource: string): string =>
  `${
    process.env.NEXT_PUBLIC_TOKEN_API_URL || "https://api.stadtpuls.com"
  }/rest/${API_VERSION}${resource}`;
