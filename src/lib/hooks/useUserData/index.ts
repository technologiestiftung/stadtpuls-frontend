import useSWR, { mutate } from "swr";
import { supabase } from "@auth/supabase";
import { AuthenticatedUsersType } from "@common/types/supabase_DEPRECATED";
import { useAuth } from "@auth/Auth";
import {
  createSensorLocally,
  deleteSensorLocally,
  updateSensorsLocally,
} from "./manageSensorsLocally";
import { useState } from "react";
import { definitions } from "@common/types/supabase";
import { sensorQueryString } from "../usePublicSensors";

type UserFetcherSignature = (
  userId?: AuthenticatedUsersType["id"],
  isLoadingAuth?: boolean
) => Promise<definitions["user_profiles"] | null>;

const fetchUser: UserFetcherSignature = async (userId, isLoadingAuth) => {
  if (isLoadingAuth || isLoadingAuth === undefined) return null;
  if (!userId) throw new Error("Not authenticated");

  const { data: user, error } = await supabase
    .from<definitions["user_profiles"]>("user_profiles")
    .select("name")
    .eq("id", userId)
    .single();

  if (error) throw error;
  else if (!user) throw new Error(`User with id "${userId} was not found"`);

  return user;
};

type SensorsFetcherSignature = (
  userId?: AuthenticatedUsersType["id"],
  isLoadingAuth?: boolean
) => Promise<definitions["sensors"][] | null>;

const fetchUserSensors: SensorsFetcherSignature = async (
  userId,
  isLoadingAuth
) => {
  if (isLoadingAuth || isLoadingAuth === undefined) return null;
  if (!userId) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .select(sensorQueryString)
    .eq("user_id", userId);

  if (error) throw error;
  else if (!data)
    throw new Error(`Sensors for user with id "${userId} not found"`);
  return data;
};

const createSensor = async (
  sensor: Omit<definitions["sensors"], "id">
): Promise<void> => {
  if (!sensor.user_id) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .insert([{ ...sensor, id: undefined }]);

  if (error) throw error;
};

const updateSensor = async ({
  id,
  created_at,
  name,
  user_id,
  external_id,
  latitude,
  longitude,
  altitude,
  connection_type,
  category_id,
  icon_id,
  description,
  location,
}: Partial<definitions["sensors"]>): Promise<void> => {
  if (!user_id) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .update({
      id,
      created_at,
      name,
      description,
      external_id,
      location,
      latitude,
      longitude,
      altitude,
      connection_type,
      category_id,
      icon_id,
    })
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) throw error;
};

const deleteSensor = async (
  id: definitions["sensors"]["id"],
  user_id: string | undefined
): Promise<void> => {
  if (!user_id) throw new Error("Not authenticated");

  const { error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) throw error;
};

const updateUser = async (
  newName: string,
  userId: string | undefined
): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const nameReset = await supabase
    .from<definitions["user_profiles"]>("user_profiles")
    .update({ name: newName })
    .eq("id", userId);

  if (nameReset.error) throw nameReset.error;
};

// We currently don't support updating the email. TODO: potentially delete this function
/* const updateEmail = async (
  newEmail: string,
  userId: string | undefined
): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase.rpc("update_email", {
    new_email: newEmail,
  });

  if (error) throw error;
}; */

const deleteUser = async (userId: string | undefined): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase.rpc("delete_user");

  if (error) throw error;
};

export const useUserData = (): {
  isLoading: boolean;
  authenticatedUser: AuthenticatedUsersType | null;
  user: definitions["user_profiles"] | null;
  sensors: definitions["sensors"][] | null;
  error: Error | null;
  createSensor: (sensor: Omit<definitions["sensors"], "id">) => Promise<void>;
  updateSensor: (sensor: Partial<definitions["sensors"]>) => Promise<void>;
  deleteSensor: (id: number) => Promise<void>;
  updateUser: (newName: string) => Promise<void>;
  /* updateEmail: (newEmail: string) => Promise<void>; */
  deleteUser: () => Promise<void>;
} => {
  const [actionError, setActionError] = useState<Error | null>(null);
  const { authenticatedUser, isLoadingAuth } = useAuth();
  const userId = authenticatedUser?.id;

  const userParams = ["userData", userId, isLoadingAuth];
  const user = useSWR<definitions["user_profiles"] | null, Error>(
    userParams,
    () => fetchUser(userId, isLoadingAuth)
  );

  const sensorsParams = ["sensors", userId, isLoadingAuth];
  const sensors = useSWR<definitions["sensors"][] | null, Error>(
    sensorsParams,
    () => fetchUserSensors(userId, isLoadingAuth)
  );

  return {
    isLoading: !user.error && !user.data,
    authenticatedUser: authenticatedUser || null,
    user: user.data || null,
    sensors: sensors.data || null,
    error: user.error || actionError || null,
    createSensor: async sensor => {
      if (!sensors.data || sensors.error) return;
      setActionError(null);
      void mutate(
        sensorsParams,
        createSensorLocally(sensors.data, sensor),
        false
      );
      await createSensor(sensor).catch(setActionError);
      void mutate(sensorsParams);
    },
    updateSensor: async sensor => {
      if (!sensors.data || sensors.error) return;
      setActionError(null);
      void mutate(
        sensorsParams,
        updateSensorsLocally(sensors.data, sensor as definitions["sensors"]),
        false
      );
      await updateSensor(sensor).catch(setActionError);
      void mutate(sensorsParams);
    },
    deleteSensor: async id => {
      if (!sensors.data || sensors.error) return;
      setActionError(null);
      void mutate(sensorsParams, deleteSensorLocally(sensors.data, id), false);
      await deleteSensor(id, userId).catch(setActionError);
      void mutate(sensorsParams);
    },
    updateUser: async name => {
      if (user.data?.name === name) return;
      void mutate(userParams, { ...user, name }, false);
      await updateUser(name, userId).catch(setActionError);
      void mutate(userParams);
    },
    /* updateEmail: async email => {
      if (authenticatedUser?.email === email) return;
      void mutate(userParams, { ...authenticatedUser, email }, false);
      await updateEmail(email, userId).catch(setActionError);
      void mutate(userParams);
    }, */
    deleteUser: async () => {
      void mutate(userParams, null, false);
      await deleteUser(userId).catch(setActionError);
      void mutate(userParams);
    },
  };
};
