import useSWR from "swr";
import { supabase } from "@auth/supabase";

interface RawRecordType {
  id: number;
  recordedAt: string | null;
  measurements: number[] | null;
  longitude: number | null;
  latitude: number | null;
  altitude: number | null;
}

interface RawDeviceType {
  id: number;
  externalId: string;
  name: string | null;
}

interface RawCategoryType {
  id: number;
  name: string;
  description: string;
}

interface RawProjectType {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  location: string | null;
  connectype: "ttn" | null;
}

export interface SupabaseResponseType extends RawRecordType {
  device: RawDeviceType & {
    project:
      | (RawProjectType & {
          category: RawCategoryType | null;
        })
      | null;
  };
}

interface MappedDeviceType extends RawDeviceType {
  records: RawRecordType[];
}

interface SupabaseProjectType extends RawProjectType {
  devices: MappedDeviceType[];
}

const mapRecordsToProject = (
  projectId: number,
  records: SupabaseResponseType[]
): SupabaseProjectType => {
  const objectsMap = records.reduce(
    (acc, rawRecord) => {
      const { device: deviceWithProject } = rawRecord;
      const { project: rawProject, ...device } = deviceWithProject;
      const { devices, ...prevProject } = acc;
      const project = rawProject || prevProject;

      if (deviceWithProject?.project?.id === projectId) {
        const deviceAlreadyExists = !!devices.find(
          ({ id }) => id === device.id
        );
        return {
          ...project,
          devices: deviceAlreadyExists
            ? devices
            : [
                ...devices,
                {
                  ...device,
                  records: records.filter(r => r.device.id === device.id),
                },
              ],
        };
      }

      return { ...project, devices };
    },
    {
      id: projectId,
      name: `Project ${projectId}`,
      description: null,
      createdAt: new Date().toISOString(),
      location: null,
      category: null,
      connectype: null,
      devices: [],
    } as SupabaseProjectType
  );
  return objectsMap;
};

const fetchProjectData = async (
  _key: string,
  projectId: number
): Promise<SupabaseProjectType> => {
  const { data: records, error } = await supabase
    .from<SupabaseResponseType>("records")
    .select(
      `
      id,
      recordedAt,
      measurements,
      longitude,
      latitude,
      altitude,
      device: deviceId (
        id,
        externalId,
        name,
        project: projectId (
          id,
          name,
          description,
          createdAt,
          location,
          connectype,
          category: categoryId (
            id,
            name,
            description
          )
        )
      )
    `
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .eq("device.project.id", `${projectId}`);
  if (error) throw error;
  if (!records || records.length === 0)
    throw new Error(`Project with id "${projectId}" was not found`);
  return mapRecordsToProject(projectId, records);
};

export const useProjectData = (
  projectId: number
): {
  data: SupabaseProjectType | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<SupabaseProjectType, Error>(
    [`project-${projectId}`, projectId],
    fetchProjectData
  );
  return {
    data: data || null,
    error: error || null,
  };
};
