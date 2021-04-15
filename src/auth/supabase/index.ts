import { createClient } from "@supabase/supabase-js";

export const getSupabaseCredentials = (): {
  url: string;
  key: string;
} => ({
  url: (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://your_supabase_url.supabase.co"
  ).toLowerCase(),
  key:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY ||
    "eyJKhbGciOisJIUzI1Nd2iIsInR5cCsI6",
});

const { url, key } = getSupabaseCredentials();
const supabase = createClient(url, key);

export { supabase };
