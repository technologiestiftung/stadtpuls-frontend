import { supabase } from "@auth/supabase";

export const isUsernameAlreadyTaken = async (
  username: string
): Promise<boolean> => {
  const { data: user } = await supabase
    .from<{ name: string }>("user_profiles")
    .select("name", { count: "exact" })
    .eq("name", username?.trim())
    .single();
  return Boolean(user);
};
