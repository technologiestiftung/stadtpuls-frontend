import { SupabaseResponseType } from "@lib/requests/getProjectData";
import { fakeProjects } from "./publicProjects";
import { fakeRecords } from "./records";

export const allProjectsRecordsData: SupabaseResponseType[] = fakeRecords;

export const publicProjectsData = fakeProjects;
