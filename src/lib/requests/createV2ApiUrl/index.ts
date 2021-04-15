const API_VERSION = "v1";

export const createV2ApiUrl = (resource: string): string =>
  `${
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://fake-supabase-api.com/rest/v1"
  }/rest/${API_VERSION}${resource}`;
