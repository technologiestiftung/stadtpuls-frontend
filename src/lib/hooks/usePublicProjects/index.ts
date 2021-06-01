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
  records: DateValueType[];
}

export interface PublicProjects {
  projects: Array<PublicProject>;
  count: number;
}

const parseDeviceRecords = (
  devices: DevicesType[] | undefined
): DateValueType[] => {
  if (!devices) return [];
  if (devices.length === 0) return [];

  const mappedDevices = devices
    .map(({ records }) =>
      (records || []).map(record => ({
        date: new Date(record.recordedAt),
        value: record.measurements ? record.measurements[0] : 0,
      }))
    )
    .sort((a, b) => b.length - a.length);
  return mappedDevices[0];
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
    .limit(10, { foreignTable: "devices" })
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
  recordsLimit = 500
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
