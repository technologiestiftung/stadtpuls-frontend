import { supabase } from "@auth/supabase";
import useSWR from "swr";

import { ProjectsType } from "@common/types/supabase";

interface DateValueType {
  date: Date;
  value: number;
}

export interface PublicProject {
  id: number;
  name: string;
  description?: string;
  location?: string;
  records?: DateValueType[][] | null;
}

export interface PublicProjects {
  projects: Array<PublicProject>;
  count: number;
}

//TODO: Find a better place to define page size for homepage
const pageSize = 10;

export const getPublicProjects = async (
  page: number,
  recordsLimit: number
): Promise<PublicProjects | null> => {
  const { data, error, count } = await supabase
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
    `,
      { count: "exact" }
    )
    .range(page * pageSize, (page + 1) * pageSize - 1)
    //FIXME: the typecasting
    .order("recordedAt" as keyof ProjectsType, {
      foreignTable: "devices.records",
      ascending: false,
    })
    .limit(1, { foreignTable: "devices" })
    .limit(recordsLimit, { foreignTable: "devices.records" });

  if (error) throw error;
  if (!data || !count) return null;
  const projects = data?.map(
    (project): PublicProject => {
      const { id, name, description, location, devices } = project;
      return {
        id,
        name,
        description,
        location,
        records:
          devices.length && devices[0].records.length
            ? devices[0]?.records[0].measurements?.map((_measurement, index) =>
                devices[0]?.records.map(record => {
                  return {
                    date: new Date(record.recordedAt),
                    //FIXME: wait for Fabian to fix db and make measurements required
                    value: record.measurements ? record.measurements[index] : 0,
                  };
                })
              )
            : null,
      };
    }
  );

  return { projects: projects, count: count };
};

export const usePublicProjects = (
  page = 0,
  recordsLimit = 50
): {
  data: PublicProjects | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<PublicProjects | null, Error>(
    ["usePublicProjects", page, recordsLimit],
    () => getPublicProjects(page, recordsLimit)
  );

  return {
    data: data || null,
    error: error || null,
  };
};
