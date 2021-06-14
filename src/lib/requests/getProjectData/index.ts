import { supabase } from "@auth/supabase";
import { ProjectsType } from "@common/types/supabase";

export const getProjectData = async (
  projectId: number
): Promise<ProjectsType> => {
  const { data: project, error } = await supabase
    .from<ProjectsType>("projects")
    .select(
      `
        id,
        name,
        connectype,
        createdAt,
        location,
        category:categoryId (
          id,
          name,
          description
        ),
        devices (
          id,
          externalId,
          name,
          records (
            id,
            recordedAt,
            measurements,
            longitude,
            latitude,
            altitude
          )
        )
      `
    )
    .eq("id", projectId)
    .single();

  if (error) throw error;
  if (!project) throw new Error(`Project with id "${projectId}" was not found`);
  return project;
};
