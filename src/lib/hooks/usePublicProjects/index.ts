import { supabase } from "@auth/supabase";
import useSWR from "swr";

import { ProjectsType, RecordsType } from "@common/types/supabase";

// interface Record {
//   recordedAt: string;
//   measurements?: RecordsType;
// }

export interface PublicProject {
  id: number;
  name: string;
  description?: string;
  location?: string;
  records?: RecordsType[];
}

export type PublicProjects = Array<PublicProject> | undefined;

const pageSize = 10;

const fetcherPublicProjects = async (page: number): Promise<PublicProjects> => {
  const { data, error } = await supabase
    .from<ProjectsType>("projects")
    .select(
      `
    id,
    name,
    description,
    location,
    devices (
      records (
        recordedAt,
        measurements
      )
    )
    `
    )
    .range(page * pageSize, (page + 1) * pageSize - 1)
    .limit(1, { foreignTable: "devices" });

  const projects = data?.map(
    (project): PublicProject => {
      const { id, name, description, location, devices } = project;
      return { id, name, description, location, records: devices[0]?.records };
    }
  );

  console.log(data);

  if (error) throw error;

  return projects;
};

export const usePublicProjects = (
  page = 0
): {
  data: PublicProject[] | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<PublicProjects, Error>(
    ["usePublicProjects", page],
    () => fetcherPublicProjects(page)
  );

  return {
    data: data || null,
    error: error || null,
  };
};
