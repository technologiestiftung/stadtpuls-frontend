import { DeviceType, RecordType, ProjectType } from "../common/interfaces";

const API_VERSION = "v1";

export const createApiUrl = (resource: string): string =>
  `${process.env.NEXT_PUBLIC_API_URL}/api/${API_VERSION}${resource}`;

export interface ProjectResponse {
  data: {
    projects: ProjectType[];
  };
}

export async function getAllProjects(): Promise<ProjectResponse> {
  const url = createApiUrl(`/projects`);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch projects");
  }
  const json = (await response.json()) as ProjectResponse;
  return json;
}

export interface DeviceResponse {
  data: {
    devices: DeviceType[];
  };
}

export async function getDevicesByProjectId(
  id: string | number
): Promise<DeviceResponse> {
  const url = createApiUrl(`/projects/${id}/devices`);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch device");
  }
  const json = (await response.json()) as DeviceResponse;
  return json;
}

export interface RecordsResponse {
  data: {
    records: RecordType[];
  };
}

export async function getRecordsByDeviceId(
  id: string | number
): Promise<RecordsResponse> {
  const url = createApiUrl(`/devices/${id}/records`);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch records");
  }
  const json = (await response.json()) as RecordsResponse;
  return json;
}
