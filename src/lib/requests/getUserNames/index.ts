import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

export const getUserNames = async (): Promise<string[]> => {
  const { data: users, error } = await supabase.from<{
    name: definitions["user_profiles"]["name"];
  }>("user_profiles").select(`
      name
    `);
  if (error) throw error;
  if (!users) throw new Error(`No users found.`);
  return users.map(user => user.name || ""); // user.name is nullable in the database, however we are not actually allowing users to not set their username
};
