import {
  getProjectData,
  SupabaseProjectType,
} from "@lib/requests/getProjectData";
import useSWR from "swr";

const getData = async (
  _key: string,
  projectId: number
): Promise<SupabaseProjectType> => getProjectData(projectId);

export const useProjectData = (
  projectId: number
): {
  data: SupabaseProjectType | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<SupabaseProjectType, Error>(
    [`project-${projectId}`, projectId],
    getData
  );
  return {
    data: data || null,
    error: error || null,
  };
};
