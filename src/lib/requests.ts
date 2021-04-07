import { DeviceType, RecordType, ProjectType } from "../common/interfaces";

export const API_VERSION = "v1";
const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${API_VERSION}`;

export interface ProjectResponse {
  data: {
    projects: ProjectType[];
  };
}

export async function getAllProjects(): Promise<ProjectResponse> {
  const response = await fetch(`${apiBaseUrl}/projects`);
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
  const response = await fetch(`${apiBaseUrl}/projects/${id}/devices`);
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
  const response = await fetch(`${apiBaseUrl}/devices/${id}/records`);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch records");
  }
  const json = (await response.json()) as RecordsResponse;
  return json;
}
