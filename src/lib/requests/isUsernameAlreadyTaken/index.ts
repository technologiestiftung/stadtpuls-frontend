import { supabase } from "@auth/supabase";

export const isUsernameAlreadyTaken = async (
  username: string
): Promise<boolean> => {
  const { data: user } = await supabase
    .from<{ name: string }>("users")
    .select("name")
    .eq("name", username)
    .single();
  return Boolean(user);
};
