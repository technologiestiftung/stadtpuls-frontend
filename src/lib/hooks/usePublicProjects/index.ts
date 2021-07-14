import { supabase } from "@auth/supabase";
import useSWR from "swr";

import { DevicesType, ProjectsType } from "@common/types/supabase";

const RECORDS_LIMIT = 500;

interface DateValueType {
  date: string;
  value: number;
}

export interface PublicProject {
  id: number;
  name: string;
  description?: string;
  location?: string;
  devicesNumber: number;
  authorName: string | null;
  category: string | null;
  records: DateValueType[];
}

export interface PublicProjects {
  projects: Array<PublicProject>;
  count?: number;
}

interface OptionsType {
  initialData: null | {
    count: number;
    projects: PublicProject[];
  };
}

const parseDeviceRecords = (
  devices: DevicesType[] | undefined
): DateValueType[] => {
  if (!devices) return [];
  if (devices.length === 0) return [];

  const mappedDevices = devices
    .map(({ records }) =>
      (records || []).map(record => ({
        date: record.recordedAt,
        value: record.measurements ? record.measurements[0] : 0,
      }))
    )
    .sort((a, b) => b.length - a.length);
  return mappedDevices[0];
};

export const projectQueryString = `
  id,
  name,
  description,
  location,
  devices (
    records (
      recordedAt,
      measurements
    )
  ),
  user:userId (
    name
  ),
  category:categoryId (
    name
  )
`;

export const mapPublicProject = (project: ProjectsType): PublicProject => {
  const { id, name, description, location, devices, user, category } = project;
  return {
    id,
    name,
    description: description || "",
    location: location || "",
    devicesNumber: devices?.length || 0,
    authorName: user?.name || null,
    records: parseDeviceRecords(devices),
    category: category?.name || null,
  };
};

export const getPublicProjects = async (): Promise<PublicProjects | null> => {
  const { data, error } = await supabase
    .from<ProjectsType>("projects")
    .select(projectQueryString)
    //FIXME: the typecasting
    .order("recordedAt" as keyof ProjectsType, {
      foreignTable: "devices.records",
      ascending: false,
    })
    .limit(RECORDS_LIMIT, { foreignTable: "devices.records" });

  if (error) throw error;
  if (!data) return null;
  const projects = data?.map(mapPublicProject);

  return { projects: projects };
};

const defaultOptions: OptionsType = {
  initialData: null,
};

export const usePublicProjects = (
  options: Partial<OptionsType> = defaultOptions
): {
  data: PublicProjects | null;
  error: Error | null;
} => {
  const initialData = options.initialData || defaultOptions.initialData;
  const { data, error } = useSWR<PublicProjects | null, Error>(
    ["usePublicProjects"],
    () => getPublicProjects(),
    { initialData }
  );

  return {
    data: data || null,
    error: error || null,
  };
};
