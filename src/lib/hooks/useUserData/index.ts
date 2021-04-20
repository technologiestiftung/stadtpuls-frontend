import useSWR from "swr";
import { supabase } from "@auth/supabase";
import {
  UsersType,
  AuthenticatedUsersType,
  ProjectsType,
  DevicesType,
} from "@common/types/supabase";
import { useAuth } from "@auth/Auth";

interface UserDataType {
  user: UsersType;
  projects: ProjectsType[];
}

const fetchUserData = async (
  authenticatedUser: AuthenticatedUsersType | null
): Promise<UserDataType> => {
  if (!authenticatedUser) throw new Error("Not authenticated");

  const { data: user, error: user_error } = await supabase
    .from<UsersType>("users")
    .select(
      `
      name
    `
    )
    .eq("id", authenticatedUser.id)
    .single();

  if (user_error) throw user_error;

  const { data: projects, error: projects_error } = await supabase
    .from<ProjectsType>("projects")
    .select(
      `
      id,
      name,
      description,
      connectype,
      location,
      category:categoryId (
        id,
        name,
        description
      ),
      devices (
        id,
        externalId,
        name
      )
    `
    )
    .eq("userId", authenticatedUser.id);

  if (projects_error) throw projects_error;
  else if (!user)
    throw new Error(`User with id "${authenticatedUser.id} was not found"`);
  else if (!projects)
    throw new Error(
      `Projects for user with id "${authenticatedUser.id} was not found"`
    );
  else return { user, projects };
};

const addDevice = async (
  device: Omit<DevicesType, "id">
): Promise<DevicesType[] | null | Error> => {
  if (!device.userId) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from<DevicesType>("devices")
    .insert([device]);
  if (error) throw error;
  else return data;
};

const updateDevice = async ({
  id,
  userId,
  externalId,
  name,
}: Partial<DevicesType>): Promise<DevicesType[] | null | Error> => {
  if (!userId) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from<DevicesType>("devices")
    .update({ externalId, name })
    .eq("id", id)
    .eq("userId", userId);
  if (error) throw error;
  else return data;
};

const deleteDevice = async (
  id: number,
  userId: string | undefined
): Promise<DevicesType[] | null | Error> => {
  if (!userId) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from<DevicesType>("devices")
    .delete()
    .eq("id", id)
    .eq("userId", userId);
  if (error) throw error;
  else return data;
};

const addProject = async (
  project: Omit<ProjectsType, "id" | "createdAt">
): Promise<ProjectsType[] | null | Error> => {
  if (!project.userId) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from<ProjectsType>("projects")
    .insert([project]);
  if (error) throw error;
  else return data;
};

const updateProject = async ({
  id,
  name,
  description,
  connectype,
  location,
  userId,
  categoryId,
}: Partial<ProjectsType>): Promise<ProjectsType[] | null | Error> => {
  if (!userId) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from<ProjectsType>("projects")
    .update({ name, description, connectype, location, categoryId })
    .eq("id", id)
    .eq("userId", userId);
  if (error) throw error;
  else return data;
};

const deleteProject = async (
  id: number,
  userId: string | undefined
): Promise<ProjectsType[] | null | Error> => {
  if (!userId) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from<ProjectsType>("projects")
    .delete()
    .eq("id", id)
    .eq("userId", userId);
  if (error) throw error;
  else return data;
};

const updateName = async (
  name: string,
  userId: string | undefined
): Promise<UsersType[] | null | Error> => {
  if (!userId) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from<UsersType>("users")
    .update({ name })
    .eq("id", userId);
  if (error) throw error;
  else return data;
};
const updateEmail = async (
  email: string,
  userId: string | undefined
): Promise<AuthenticatedUsersType | null | Error> => {
  if (!userId) throw new Error("Not authenticated");
  const { user, error } = await supabase.auth.update({
    data: { email },
  });
  if (error) throw error;
  else return user as AuthenticatedUsersType;
};
const deleteUser = async (
  userId: string | undefined
): Promise<any[] | null | Error> => {
  if (!userId) throw new Error("Not authenticated");
  const { data, error } = await supabase.rpc("delete_user");
  if (error) throw error;
  else return data;
};

export const useUserData = (): {
  authenticatedUser: AuthenticatedUsersType | null;
  user: UsersType | null;
  projects: ProjectsType[] | null;
  error: Error | null;
  addDevice: ({
    externalId,
    name,
    projectId,
  }: DevicesType) => Promise<DevicesType[] | null | Error>;
  updateDevice: ({
    id,
    externalId,
    name,
  }: DevicesType) => Promise<DevicesType[] | null | Error>;
  deleteDevice: (id: number) => Promise<DevicesType[] | null | Error>;
  addProject: ({
    name,
    description,
    connectype,
    location,
    categoryId,
  }: ProjectsType) => Promise<ProjectsType[] | null | Error>;
  updateProject: ({
    id,
    name,
    description,
    connectype,
    location,
    categoryId,
  }: ProjectsType) => Promise<ProjectsType[] | null | Error>;
  deleteProject: (id: number) => Promise<ProjectsType[] | null | Error>;
  updateName: (name: string) => Promise<UsersType[] | null | Error>;
  updateEmail: (
    email: string
  ) => Promise<AuthenticatedUsersType | null | Error>;
  deleteUser: () => Promise<any[] | null | Error>;
} => {
  const { authenticatedUser } = useAuth();
  const { data, error } = useSWR<UserDataType, Error>(
    ["user", authenticatedUser?.id],
    () => fetchUserData(authenticatedUser)
  );

  return {
    authenticatedUser: authenticatedUser || null,
    user: data?.user || null,
    projects: data?.projects || null,
    error: error || null,
    addDevice: ({ externalId, name, projectId }) =>
      addDevice({ externalId, name, projectId, userId: authenticatedUser?.id }),
    updateDevice: ({ id, externalId, name }) =>
      updateDevice({ id, externalId, name, userId: authenticatedUser?.id }),
    deleteDevice: id => deleteDevice(id, authenticatedUser?.id),
    addProject: ({ name, description, connectype, location, categoryId }) =>
      addProject({
        name,
        description,
        connectype,
        location,
        categoryId,
        userId: authenticatedUser?.id,
      }),
    updateProject: ({
      id,
      name,
      description,
      connectype,
      location,
      categoryId,
    }) =>
      updateProject({
        id,
        name,
        description,
        connectype,
        location,
        categoryId,
        userId: authenticatedUser?.id,
      }),
    deleteProject: id => deleteProject(id, authenticatedUser?.id),
    updateName: (name: string) => updateName(name, authenticatedUser?.id),
    updateEmail: (email: string) => updateEmail(email, authenticatedUser?.id),
    deleteUser: () => deleteUser(authenticatedUser?.id),
  };
};
