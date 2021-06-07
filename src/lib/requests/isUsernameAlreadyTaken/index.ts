import { supabase } from "@auth/supabase";

export const isUsernameAlreadyTaken = async (
  username: string
): Promise<boolean> => {
  const { data: user } = await supabase
    .from<{ name: string }>("users")
    .select("name", { count: "exact" })
    .eq("name", username)
    .single();
  return Boolean(user);
};
