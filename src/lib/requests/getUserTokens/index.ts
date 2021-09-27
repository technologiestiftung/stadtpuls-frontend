import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

export const tokensQueryString = `
  id,
  description,
  nice_id,
  user_id,
  scope
`;

export const getUserTokens = async (
  userId: string
): Promise<definitions["auth_tokens"][]> => {
  const { data: tokens, error } = await supabase
    .from<definitions["auth_tokens"]>("auth_tokens")
    .select(tokensQueryString)
    .eq("user_id", userId);
  if (error) throw error;
  if (!tokens) throw new Error(`No tokens found for user ID "${userId}"`);
  return tokens;
};
