import { SupabaseResponseType } from "@lib/requests/getProjectData";
import { fakeCategories } from "./categories";
import { fakeProjects } from "./publicProjects";
import { fakeRecords } from "./records";

export const allProjectsRecordsData: SupabaseResponseType[] = fakeRecords;

export const publicProjectsData = fakeProjects;

export const publicCategories = fakeCategories;
