const API_VERSION = "v1";

export const createV2ApiUrl = (resource: string): string =>
  `${
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://your_supabase_url.supabase.co"
  }/rest/${API_VERSION}${resource}`;
