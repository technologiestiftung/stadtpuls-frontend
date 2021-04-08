import { ProjectType } from "../../common/interfaces";
import { createApiUrl } from "../requests";

export interface ProjectResponse {
  data: {
    projects: ProjectType[];
  };
}

export async function getAllProjects(): Promise<ProjectType[]> {
  const url = createApiUrl(`/projects`);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch projects");
  }
  const {
    data: { projects },
  } = (await response.json()) as ProjectResponse;
  return projects;
}
