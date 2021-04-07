import { DeviceType, RecordType, ProjectType } from "../common/interfaces";

export const API_VERSION = "v1";

export interface ProjectResponse {
  data: {
    projects: ProjectType[];
  };
}

export async function getProjects(url: string): Promise<ProjectResponse> {
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

export async function getDevices(url: string): Promise<DeviceResponse> {
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

export async function getRecords(url: string): Promise<RecordsResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch records");
  }
  const json = (await response.json()) as RecordsResponse;
  return json;
}
