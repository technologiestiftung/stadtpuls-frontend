import useSWR, { mutate } from "swr";
import { supabase } from "@auth/supabase";
import { AuthenticatedUsersType } from "@common/types/authenticated_user";
import { useAuth } from "@auth/Auth";
import {
  createSensorLocally,
  deleteSensorLocally,
  updateSensorsLocally,
} from "./manageSensorsLocally";
import { useState } from "react";
import { definitions } from "@common/types/supabase";
import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
  sensorQueryString,
} from "../usePublicSensors";

interface UseUserDataInitialDataType {
  user?: definitions["user_profiles"];
  sensors?: ParsedSensorType[];
}

export type SensorWithEditablePropsType = Omit<
  ParsedSensorType,
  "id" | "categoryName" | "authorName" | "authorUsername" | "parsedRecords"
>;

type UserFetcherSignature = (
  userId?: AuthenticatedUsersType["id"],
  isLoadingAuth?: boolean
) => Promise<definitions["user_profiles"] | null>;

const fetchUser: UserFetcherSignature = async (userId, isLoadingAuth) => {
  if (isLoadingAuth || isLoadingAuth === undefined) return null;
  if (!userId) return null;

  const { data: user, error } = await supabase
    .from<definitions["user_profiles"]>("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  else if (!user) throw new Error(`User with id "${userId} was not found"`);

  return user;
};

type SensorsFetcherSignature = (
  userId?: AuthenticatedUsersType["id"],
  isLoadingAuth?: boolean
) => Promise<ParsedSensorType[] | null>;

export const fetchUserSensors: SensorsFetcherSignature = async userId => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    //FIXME: the ignorance
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .order("recorded_at", {
      foreignTable: "records",
      ascending: false,
    })
    .eq("user_id", userId);

  if (error) throw error;
  else if (!data)
    throw new Error(`Sensors for user with id "${userId} not found"`);
  return data.map(mapPublicSensor);
};

const parsedSensorToRawSensor = (
  sensor: SensorWithEditablePropsType
): Omit<definitions["sensors"], "id"> => ({
  created_at: sensor.createdAt,
  name: sensor.name,
  description: sensor.description,
  external_id: sensor.ttnDeviceId,
  latitude: sensor.latitude,
  longitude: sensor.longitude,
  connection_type: sensor.connectionType,
  category_id: sensor.categoryId,
  icon_id: sensor.symbolId,
  user_id: sensor.authorId,
});

const createSensor = async (
  sensor: SensorWithEditablePropsType
): Promise<number> => {
  const rawSensor = parsedSensorToRawSensor(sensor);
  const { data, error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .insert([rawSensor]);

  if (error) throw error;
  if (!data || !data[0].id)
    throw "Sensor could not be created. Not ID returned.";
  return data[0].id;
};

const updateSensor = async (sensor: ParsedSensorType): Promise<void> => {
  const rawSensor = parsedSensorToRawSensor(sensor);
  const { error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .update({ ...rawSensor, id: undefined })
    .eq("id", sensor.id)
    .eq("user_id", sensor.authorId);

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
  newUserData: Partial<definitions["user_profiles"]>
): Promise<void> => {
  const nameReset = await supabase
    .from<definitions["user_profiles"]>("user_profiles")
    .update({
      display_name: newUserData.display_name,
      description: newUserData.description,
      url: newUserData.url,
    })
    .eq("id", newUserData.id);

  if (nameReset.error) throw nameReset.error;
};

const deleteUser = async (userId: string | undefined): Promise<void> => {
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase.rpc("delete_user");

  if (error) throw error;
};

export const useUserData = (
  initialData?: UseUserDataInitialDataType
): {
  isLoading: boolean;
  authenticatedUser: AuthenticatedUsersType | null;
  user: definitions["user_profiles"] | null;
  sensors: ParsedSensorType[] | null;
  error: Error | null;
  createSensor: (sensor: SensorWithEditablePropsType) => Promise<number>;
  updateSensor: (sensor: ParsedSensorType) => Promise<void>;
  deleteSensor: (id: number) => Promise<void>;
  updateUser: (
    newUserData: Partial<definitions["user_profiles"]>
  ) => Promise<void>;
  deleteUser: () => Promise<void>;
  isLoggedIn: boolean;
} => {
  const [actionError, setActionError] = useState<Error | null>(null);
  const { authenticatedUser, isLoadingAuth } = useAuth();
  const userId = authenticatedUser?.id;

  const userParams = ["userData", userId, isLoadingAuth];
  const user = useSWR<definitions["user_profiles"] | null, Error>(
    userParams,
    () => fetchUser(userId, isLoadingAuth),
    { initialData: initialData?.user }
  );

  const sensorsParams = ["sensors", userId, isLoadingAuth];
  const sensors = useSWR<ParsedSensorType[] | null, Error>(
    sensorsParams,
    () => fetchUserSensors(userId),
    { initialData: initialData?.sensors }
  );

  return {
    isLoggedIn: Boolean(user.data && authenticatedUser),
    isLoading: !user.error && !user.data,
    authenticatedUser: authenticatedUser || null,
    user: user.data || null,
    sensors: sensors.data || [],
    error: user.error || actionError || null,
    createSensor: async sensor => {
      if (!sensors.data || sensors.error) throw "No Sensor data or error!";
      setActionError(null);
      await mutate(
        sensorsParams,
        createSensorLocally(sensors.data, sensor),
        false
      );
      const newId = await createSensor(sensor);
      await mutate(sensorsParams);
      return newId;
    },
    updateSensor: async sensor => {
      if (!sensors.data || sensors.error) return;
      setActionError(null);
      void mutate(
        sensorsParams,
        updateSensorsLocally(sensors.data, sensor),
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
    updateUser: async (newUserData: Partial<definitions["user_profiles"]>) => {
      if (!newUserData) return;
      void mutate(userParams, newUserData, false);
      await updateUser(newUserData).catch(setActionError);
      void mutate(userParams);
    },
    deleteUser: async () => {
      void mutate(userParams, null, false);
      await deleteUser(userId).catch(setActionError);
      void mutate(userParams);
    },
  };
};
