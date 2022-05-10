import { supabase } from "@auth/supabase";
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:8080";
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

if (typeof apiKey !== "string") {
  throw new Error("Missing env var NEXT_PUBLIC_SUPABASE_PUBLIC_KEY");
}

type SessionType = ReturnType<typeof supabase.auth.session>;

type GetSessionSignature = (body: {
  email: string;
  password: string;
}) => Promise<SessionType>;

const getSession: GetSessionSignature = async body => {
  const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apiKey },
    body: JSON.stringify(body),
  });
  return (await res.json()) as SessionType;
};

type ProgramaticSignupSignature = (body: {
  email: string;
  password: string;
}) => Promise<SessionType>;

export const programaticSignup: ProgramaticSignupSignature = async body => {
  await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: "POST",
    headers: { apiKey },
    body: JSON.stringify(body),
  });
  return await getSession(body);
};

type ProgramaticUserDeleteSignature = (session: SessionType) => Promise<void>;

export const programaticUserDelete: ProgramaticUserDeleteSignature =
  async session => {
    if (typeof session?.access_token !== "string") {
      throw new Error("Missing session.access_token");
    }
    await fetch(`${supabaseUrl}/rest/v1/rpc/delete_user`, {
      method: "POST",
      headers: {
        apiKey,
        Authorization: `Bearer ${session.access_token}`,
      },
    });
  };
