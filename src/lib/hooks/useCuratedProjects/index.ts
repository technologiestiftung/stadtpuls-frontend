import {
  mapPublicProject,
  projectQueryString,
  PublicProject,
} from "./../usePublicProjects/index";
import { supabase } from "@auth/supabase";
import useSWR from "swr";

import { ProjectsType } from "@common/types/supabase_DEPRECATED";

const RECORDS_LIMIT = 500;
const PROJECTS_LIMIT = 3;

export const getCuratedProjects = async (): Promise<PublicProject[]> => {
  const { data, error } = await supabase
    .from<ProjectsType>("projects")
    .select(projectQueryString)
    //FIXME: the typecasting
    .order("recordedAt" as keyof ProjectsType, {
      foreignTable: "devices.records",
      ascending: false,
    })
    .limit(PROJECTS_LIMIT)
    .limit(RECORDS_LIMIT, { foreignTable: "devices.records" });

  if (error) throw error;
  if (!data) return [];
  const projects = data?.map(mapPublicProject);

  return projects;
};

export const useCuratedProjects = (): {
  data: PublicProject[] | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<PublicProject[], Error>(
    "useCuratedProjects",
    getCuratedProjects
  );

  return {
    data: data || null,
    error: error || null,
  };
};
