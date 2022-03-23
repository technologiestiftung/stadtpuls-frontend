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
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import {
  mapPublicSensor,
  ParsedSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { mapPublicAccount } from "@lib/hooks/usePublicAccounts";
import { sensorQueryString } from "@lib/requests/getPublicSensors";
import { AccountWithSensorsType } from "@lib/requests/getAccountDataByUsername";

interface UseUserDataInitialDataType {
  user?: AccountWithSensorsType;
  sensors?: ParsedSensorType[];
}

export type SensorWithEditablePropsType = Omit<
  ParsedSensorType,
  "id" | "categoryName" | "authorName" | "authorUsername" | "parsedRecords"
>;

type UserFetcherSignature = (
  userId?: AuthenticatedUsersType["id"],
  isLoadingAuth?: boolean
) => Promise<AccountWithSensorsType | null>;

const fetchUser: UserFetcherSignature = async userId => {
  if (!userId) return null;

  const { data: userData, error } = await supabase
    .from<definitions["extended_user_profiles"]>("extended_user_profiles")
    .select("*")
    .eq("id", userId.trim())
    .single();

  if (error) throw error;
  else if (!userData) throw new Error(`User with id "${userId} was not found"`);

  const { data: sensors, error: sensorsError } = await supabase
    .from<SensorQueryResponseType>("sensors")
    .select(sensorQueryString)
    .eq("user_id", userId.trim());
  if (sensorsError) throw sensorsError;
  if (!sensors) throw new Error(`No sensors found for user id "${userId}"`);

  const accountDataWithSensors = {
    ...mapPublicAccount(userData),
    sensors: sensors?.map(mapPublicSensor) || [],
  };
  return accountDataWithSensors;
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
    .eq("user_id", userId.trim());

  if (error) throw error;
  else if (!data)
    throw new Error(`Sensors for user with id "${userId} not found"`);
  return data.map(mapPublicSensor);
};

const parsedSensorToRawSensor = (
  sensor: SensorWithEditablePropsType
): Omit<definitions["sensors"], "id"> => ({
  created_at: sensor.createdAt,
  name: sensor.name.trim(),
  description: sensor.description,
  external_id: sensor.ttnDeviceId?.trim(),
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
    .insert([
      {
        ...rawSensor,
        name: rawSensor.name?.trim() || "",
      },
    ]);

  if (error) throw error;
  if (!data || !data[0].id)
    throw "Sensor could not be created. Not ID returned.";
  return data[0].id;
};

const updateSensor = async (sensor: ParsedSensorType): Promise<void> => {
  const rawSensor = parsedSensorToRawSensor(sensor);
  const { error } = await supabase
    .from<definitions["sensors"]>("sensors")
    .update({ ...rawSensor, name: rawSensor.name?.trim() || "", id: undefined })
    .eq("id", sensor.id)
    .eq("user_id", sensor.authorId.trim());

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
    .eq("user_id", user_id.trim());

  if (error) throw error;
};

const updateUser = async (
  newUserData: Partial<AccountWithSensorsType>
): Promise<void> => {
  const nameReset = await supabase
    .from<definitions["user_profiles"]>("user_profiles")
    .update({
      display_name: newUserData.displayName?.trim(),
      description: newUserData.description,
      url: newUserData.link,
    })
    .eq("id", newUserData.id?.trim());

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
  user: AccountWithSensorsType | null;
  sensors: ParsedSensorType[] | null;
  error: Error | null;
  createSensor: (sensor: SensorWithEditablePropsType) => Promise<number>;
  updateSensor: (sensor: ParsedSensorType) => Promise<void>;
  deleteSensor: (id: number) => Promise<void>;
  updateUser: (newUserData: AccountWithSensorsType) => Promise<void>;
  deleteUser: () => Promise<void>;
  isLoggedIn: boolean;
} => {
  const [actionError, setActionError] = useState<Error | null>(null);
  const { authenticatedUser, isLoadingAuth, isAuthenticating } = useAuth();
  const userId = authenticatedUser?.id;

  const userParams = ["userData", userId];
  const user = useSWR<AccountWithSensorsType | null, Error>(
    userParams,
    () => fetchUser(userId),
    { fallbackData: initialData?.user }
  );

  const sensorsParams = ["sensors", userId];
  const sensors = useSWR<ParsedSensorType[] | null, Error>(
    sensorsParams,
    () => fetchUserSensors(userId),
    { fallbackData: initialData?.sensors }
  );

  return {
    isLoggedIn: Boolean(
      !!user.data && !!authenticatedUser && !isLoadingAuth && !isAuthenticating
    ),
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
    updateUser: async (newUserData: AccountWithSensorsType) => {
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
