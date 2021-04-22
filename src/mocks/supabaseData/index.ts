import { DevicesType, ProjectsType } from "@common/types/supabase";
import { SupabaseResponseType } from "@lib/requests/getProjectData";
import { fakeCategories } from "./categories";
import { fakeProjects } from "./publicProjects";
import { fakeRecords } from "./records";
import {
  fakeAuthToken,
  fakeRefreshToken,
  fakeUserData,
  fakeUserProjects,
} from "./userData";

export const allProjectsRecordsData: SupabaseResponseType[] = fakeRecords;

export const publicProjectsData = fakeProjects;

export const publicCategories = fakeCategories;
//userData
export const refreshToken = fakeRefreshToken;
export const authToken = fakeAuthToken;
export const userData = fakeUserData;
export const userProjects = fakeUserProjects;
export const getDevice = (id: number): null | DevicesType[] =>
  fakeUserProjects.reduce<null | DevicesType[]>((res, project) => {
    const device = project.devices.find(device => device.id == id);
    if (device) {
      res = [{ ...device, projectId: project.id }];
    }
    return res;
  }, null);
export const getProject = (
  id: number
): null | Omit<ProjectsType, "categoryId"> =>
  fakeUserProjects.reduce<null | Omit<ProjectsType, "categoryId">>(
    (res, project) => {
      if (project.id == id) {
        const {
          id,
          name,
          description,
          connectype,
          location,
        } = project as ProjectsType;
        const createdAt = new Date().toISOString();
        res = { id, name, description, connectype, location, createdAt };
      }
      return res;
    },
    null
  );
