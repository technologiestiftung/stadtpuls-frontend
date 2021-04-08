import { ProjectType } from "@common/interfaces";
import { FetchResponse } from "@common/types";
import { createApiUrl } from "@lib/requests/createApiUrl";

type ProjectResponse = FetchResponse<"projects", ProjectType[]>;
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
