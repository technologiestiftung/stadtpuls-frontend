import { supabase } from "@auth/supabase";
import useSWR from "swr";

import { DevicesType, ProjectsType } from "@common/types/supabase";

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

const parseDeviceRecords = (
  devices: DevicesType[] | undefined
): DateValueType[][] | null => {
  if (!devices) return null;
  else if (devices.length === 0) return null;
  else if (!devices[0].records) return null;
  else if (devices[0].records.length === 0) return null;
  else if (!devices[0].records[0].measurements) return null;
  else if (devices[0].records[0].measurements.length === 0) return null;
  else {
    return devices[0].records[0].measurements.map((_measurement, index) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      devices[0].records.map(record => {
        return {
          date: new Date(record.recordedAt),
          value: record.measurements ? record.measurements[index] : 0,
        };
      })
    );
  }
};

export const getPublicProjects = async (
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
        records: parseDeviceRecords(devices),
      };
    }
  );

  return { projects: projects, count: count };
};

export const usePublicProjects = (
  recordsLimit = 50
): {
  data: PublicProjects | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<PublicProjects | null, Error>(
    ["usePublicProjects", recordsLimit],
    () => getPublicProjects(recordsLimit)
  );

  return {
    data: data || null,
    error: error || null,
  };
};
