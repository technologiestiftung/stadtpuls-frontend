import { ProjectsType } from "@common/types/supabase_DEPRECATED";
import { getProjectData } from "@lib/requests/getProjectData_DEPRECATED";
import useSWR from "swr";

const getData = async (
  _key: string,
  projectId: number
): Promise<ProjectsType> => getProjectData(projectId);

export const useProjectData = (
  projectId: number
): {
  data: ProjectsType | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<ProjectsType, Error>(
    [`project-${projectId}`, projectId],
    getData
  );
  return {
    data: data || null,
    error: error || null,
  };
};
