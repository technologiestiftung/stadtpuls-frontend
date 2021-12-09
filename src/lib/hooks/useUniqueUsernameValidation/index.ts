import { definitions } from "@common/types/supabase";
import { supabase } from "@auth/supabase";
import useSWR from "swr";

const checkIfUsernameIsUnique = async (username?: string): Promise<boolean> => {
  if (!username) return false;
  const { data: usersWithMatchingUsernames, error } = await supabase
    .from<definitions["user_profiles"]>("user_profiles")
    .select("id")
    .ilike("name", `%${username.trim()}%`);

  if (error) throw error;
  return !usersWithMatchingUsernames || usersWithMatchingUsernames.length === 0;
};

export const useUniqueUsernameValidation = (
  username?: string
): {
  isUnique: boolean;
  isLoading: boolean;
  error: Error | null;
} => {
  const { data: isUnique, error } = useSWR<boolean, Error>(
    username || "empty",
    () => checkIfUsernameIsUnique(username),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  return {
    isUnique: !!isUnique,
    error: error || null,
    isLoading: !error && typeof isUnique === "undefined",
  };
};
