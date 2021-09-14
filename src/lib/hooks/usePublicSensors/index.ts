import { supabase } from "@auth/supabase";
import useSWR from "swr";
import { definitions } from "@common/types/supabase";
import {
  DateValueType,
  PublicSensorType,
  SensorQueryResponseType,
} from "@common/interfaces";

export const RECORDS_LIMIT = 500;

export const sensorQueryString = `
  id,
  name,
  description,
  location,
  records (
    recorded_at,
    measurements
  ),
  user:user_id (
    name
  ),
  category:category_id (
    name
  )
`;

export interface PublicSensors {
  sensors: PublicSensorType[];
  count?: number;
}

interface OptionsType {
  initialData: null | {
    count: number;
    sensors: PublicSensorType[];
  };
}

export const parseSensorRecords = (
  records: definitions["records"][] | undefined
): DateValueType[] => {
  if (!records) return [];
  if (records.length === 0) return [];

  const mappedRecords = records.map(record => ({
    date: record.recorded_at,
    value: record.measurements ? record.measurements[0] : 0,
  }));
  return mappedRecords;
};

export const mapPublicSensor = (
  sensor: SensorQueryResponseType
): PublicSensorType => {
  const { id, name, description, location, user, category, records } = sensor;
  return {
    id,
    name: name || "",
    description: description || "",
    location: location || "",
    authorName: user?.name || null,
    parsedRecords: parseSensorRecords(records),
    categoryName: category?.name || null,
  };
};

export const getPublicSensors = async (): Promise<PublicSensors> => {
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
    .limit(RECORDS_LIMIT, { foreignTable: "records" });

  if (error) throw error;
  if (!data) return { sensors: [] };
  const sensors = data?.map(mapPublicSensor);

  return { sensors: sensors };
};

const defaultOptions: OptionsType = {
  initialData: null,
};

export const usePublicSensors = (
  options: Partial<OptionsType> = defaultOptions
): {
  data: PublicSensors | null;
  error: Error | null;
} => {
  const initialData = options.initialData || defaultOptions.initialData;
  const { data, error } = useSWR<PublicSensors | null, Error>(
    ["usePublicSensors"],
    () => getPublicSensors(),
    { initialData }
  );

  return {
    data: data || null,
    error: error || null,
  };
};
