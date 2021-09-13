import { supabase } from "@auth/supabase";
import { ProjectsType } from "@common/types/supabase_DEPRECATED";

export const getProjects = async (): Promise<ProjectsType[]> => {
  const { data: projects, error } = await supabase
    .from<ProjectsType>("projects")
    .select("*");

  if (error) throw error;
  if (!projects) throw new Error(`No projects found`);
  return projects;
};
