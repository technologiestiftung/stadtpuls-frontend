import { ProjectType } from "@common/interfaces";
import { FetchResponse } from "@common/types";
import { createV1ApiUrl } from "@lib/requests/createV1ApiUrl";

type ProjectResponse = FetchResponse<"projects", ProjectType[]>;
export async function getAllProjects(): Promise<ProjectType[]> {
  const url = createV1ApiUrl(`/projects`);
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
