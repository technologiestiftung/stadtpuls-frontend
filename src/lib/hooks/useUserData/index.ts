import {
  deleteProjectsProject,
  updateProjectsProject,
} from "./updateProjectsProject";
import useSWR, { mutate } from "swr";
import { supabase } from "@auth/supabase";
import {
  UsersType,
  AuthenticatedUsersType,
  ProjectsType,
  DevicesType,
} from "@common/types/supabase";
import { useAuth } from "@auth/Auth";
import {
  addProjectsDevice,
  deleteProjectsDevice,
  updateProjectsDevice,
} from "./updateProjectsDevice";
import { useState } from "react";

type UserFetcherSignature = (
  userId?: AuthenticatedUsersType["id"],
  isLoadingAuth?: boolean
) => Promise<UsersType | null>;

type ProjectsFetcherSignature = (
  userId?: AuthenticatedUsersType["id"],
  isLoadingAuth?: boolean
) => Promise<ProjectsType[] | null>;

const fetchUser: UserFetcherSignature = async (userId, isLoadingAuth) => {
  if (isLoadingAuth || isLoadingAuth === undefined) return null;
  if (!userId) throw new Error("Not authenticated");

  const { data: user, error } = await supabase
    .from<UsersType>("users")
    .select("name")
    .eq("id", userId)
    .single();

  if (error) throw error;
  else if (!user) throw new Error(`User with id "${userId} was not found"`);

  return user;
};

const fetchProjects: ProjectsFetcherSignature = async (
  userId,
  isLoadingAuth
) => {
  if (isLoadingAuth || isLoadingAuth === undefined) return null;
  if (!userId) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from<ProjectsType>("projects")
    .select(
      `
      id,
      name,
      description,
      connectype,
      location,
      category: categoryId (
        id,
        name,
        description
      ),
      devices (
        id,
        externalId,
        name,
        records (
          id,
          recordedAt
        )
      )
    `
    )
    .eq("userId", userId);

  if (error) throw error;
  else if (!data)
    throw new Error(`Projects for user with id "${userId} was not found"`);
  return data;
};

const addDevice = async (device: DevicesType): Promise<void> => {
  if (!device.userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<DevicesType>("devices")
    .insert([device]);

  if (error) throw error;
};

const updateDevice = async ({
  id,
  userId,
  externalId,
  name,
}: Partial<DevicesType>): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<DevicesType>("devices")
    .update({ externalId, name })
    .eq("id", id)
    .eq("userId", userId);

  if (error) throw error;
};

const deleteDevice = async (
  id: DevicesType["id"],
  userId: string | undefined
): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<DevicesType>("devices")
    .delete()
    .eq("id", id)
    .eq("userId", userId);

  if (error) throw error;
};

const addProject = async (project: ProjectsType): Promise<void> => {
  if (!project.userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<ProjectsType>("projects")
    .insert([project]);

  if (error) throw error;
};

const updateProject = async ({
  id,
  name,
  description,
  connectype,
  location,
  userId,
  categoryId,
}: Partial<ProjectsType>): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<ProjectsType>("projects")
    .update({ name, description, connectype, location, categoryId })
    .eq("id", id)
    .eq("userId", userId);

  if (error) throw error;
};

const deleteProject = async (
  id: number,
  userId: string | undefined
): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<ProjectsType>("projects")
    .delete()
    .eq("id", id)
    .eq("userId", userId);

  if (error) throw error;
};

const updateName = async (
  name: string,
  userId: string | undefined
): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<UsersType>("users")
    .update({ name })
    .eq("id", userId);

  if (error) throw error;
};

const updateEmail = async (
  email: string,
  userId: string | undefined
): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase.auth.update({
    data: { email },
  });

  if (error) throw error;
};

const deleteUser = async (userId: string | undefined): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase.rpc("delete_user");

  if (error) throw error;
};

export const useUserData = (): {
  isLoading: boolean;
  authenticatedUser: AuthenticatedUsersType | null;
  user: UsersType | null;
  projects: ProjectsType[] | null;
  error: Error | null;
  addDevice: (
    device: DevicesType,
    projectId: ProjectsType["id"]
  ) => Promise<void>;
  updateDevice: (device: DevicesType) => Promise<void>;
  deleteDevice: (id: number) => Promise<void>;
  addProject: (project: ProjectsType) => Promise<void>;
  updateProject: (project: ProjectsType) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateName: (name: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  deleteUser: () => Promise<void>;
} => {
  const [actionError, setActionError] = useState<Error | null>(null);
  const { authenticatedUser, isLoadingAuth } = useAuth();
  const userId = authenticatedUser?.id;

  const userParams = ["userData", userId, isLoadingAuth];
  const user = useSWR<UsersType | null, Error>(userParams, () =>
    fetchUser(userId, isLoadingAuth)
  );

  const projectsParams = ["projects", userId, isLoadingAuth];
  const projects = useSWR<ProjectsType[] | null, Error>(projectsParams, () =>
    fetchProjects(userId, isLoadingAuth)
  );

  return {
    isLoading: !user.error && !projects.error && !user.data && !projects.data,
    authenticatedUser: authenticatedUser || null,
    user: user.data || null,
    projects: projects.data || null,
    error: projects.error || user.error || actionError || null,
    addDevice: async (device, projectId) => {
      if (!projects.data || projects.error) return;
      setActionError(null);
      void mutate(
        projectsParams,
        addProjectsDevice(projects.data, device, projectId),
        false
      );
      await addDevice({ ...device, userId }).catch(setActionError);
      void mutate(projectsParams);
    },
    updateDevice: async device => {
      if (!projects.data || projects.error) return;
      setActionError(null);
      void mutate(
        projectsParams,
        updateProjectsDevice(projects.data, device),
        false
      );
      await updateDevice({ ...device, userId }).catch(setActionError);
      void mutate(projectsParams);
    },
    deleteDevice: async id => {
      if (!projects.data || projects.error) return;
      setActionError(null);
      void mutate(
        projectsParams,
        deleteProjectsDevice(projects.data, id),
        false
      );
      await deleteDevice(id, userId).catch(setActionError);
      void mutate(projectsParams);
    },
    addProject: async project => {
      if (!projects.data || projects.error) return;
      setActionError(null);
      void mutate(projectsParams, [...projects.data, project], false);
      await addProject({ ...project, userId }).catch(setActionError);
      void mutate(projectsParams);
    },
    updateProject: async project => {
      if (!projects.data || projects.error) return;
      setActionError(null);
      void mutate(
        projectsParams,
        updateProjectsProject(projects.data, project),
        false
      );
      await updateProject({ ...project, userId }).catch(setActionError);
      void mutate(projectsParams);
    },
    deleteProject: async id => {
      if (!projects.data || projects.error) return;
      setActionError(null);
      void mutate(
        projectsParams,
        deleteProjectsProject(projects.data, id),
        false
      );
      await deleteProject(id, userId).catch(setActionError);
      void mutate(projectsParams);
    },
    updateName: async name => {
      void mutate(userParams, { ...user, name }, false);
      await updateName(name, userId).catch(setActionError);
      void mutate(userParams);
    },
    updateEmail: async email => {
      void mutate(userParams, { ...user, email }, false);
      await updateEmail(email, userId).catch(setActionError);
      void mutate(userParams);
    },
    deleteUser: async () => {
      void mutate(userParams, null, false);
      await deleteUser(userId).catch(setActionError);
      void mutate(userParams);
    },
  };
};
