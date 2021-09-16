import {
  PublicSensorType,
  SensorQueryResponseType,
} from "@lib/hooks/usePublicSensors";
import { getSensorRecords } from "./records";
import { categories } from "./categories";
import { userprofiles } from "./userprofiles";
import { parseSensorRecords } from "@lib/hooks/usePublicSensors";

export const httpSensors: SensorQueryResponseType[] = [
  {
    id: 1,
    name: "Temperatur Grunewaldstraße",
    created_at: "2020-12-01T07:00:00",
    connection_type: "ttn",
    description:
      "Temperaturmessung den Räumlichkeiten der Technologiestiftung Berlin in der Grunewaldstraße",
    external_id: "ttn-device-id-123",
    category_id: 1,
    location: "Berlin",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 1,
      numberOfRecords: 209,
      firstRecordDate: "2020-12-01T08:00:00",
    }),
    latitude: 52.48864,
    longitude: 13.342667,
    altitude: 60,
    category: categories[0],
    user: userprofiles[0],
    icon_id: 1,
  },
  {
    id: 2,
    name: "Plan of Simplicity",
    created_at: "2021-05-19T018:00:00",
    connection_type: "ttn",
    description:
      "What is once well done is done forever. - Henry David Thoreau",
    external_id: "ttn-device-id-456",
    category_id: 2,
    location: "Neubrandenburg",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 2,
      numberOfRecords: 708,
      firstRecordDate: "2021-05-19T19:00:00",
    }),
    latitude: 53.561847,
    longitude: 13.273557,
    altitude: 60,
    category: categories[1],
    user: userprofiles[0],
    icon_id: 4,
  },
  {
    id: 3,
    name: "Shadow of Struggle",
    created_at: "2021-08-25T011:00:00",
    connection_type: "http",
    category_id: 2,
    location: "Hamburg",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 3,
      numberOfRecords: 190,
      firstRecordDate: "2021-08-25T12:00:00",
    }),
    latitude: 53.551681,
    longitude: 9.939079,
    altitude: 60,
    category: categories[1],
    user: userprofiles[0],
    icon_id: 19,
  },
];

export const ttnSensors: SensorQueryResponseType[] = [
  {
    id: 4,
    name: "Poison Thing",
    created_at: "2021-09-03T008:00:00",
    connection_type: "http",
    description:
      "Ambition is the path to success. Persistence is the vehicle you arrive in. - Bill Bradley",
    category_id: 3,
    location: "Düren",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 4,
      numberOfRecords: 5,
      firstRecordDate: "2021-09-03T09:00:00",
    }),
    latitude: 50.799519,
    longitude: 6.474333,
    altitude: 60,
    category: categories[2],
    user: userprofiles[0],
    icon_id: 3,
  },
  {
    id: 5,
    name: "Delicate Collapse",
    created_at: "2021-09-12T022:00:00",
    connection_type: "http",
    description:
      "Sadness flies away on the wings of time. - Jean de La Fontaine",
    category_id: 4,
    location: "Villingen-Schwenningen",
    user_id: userprofiles[0].id,
    records: getSensorRecords({
      sensorId: 5,
      numberOfRecords: 452,
      firstRecordDate: "2021-09-12T23:00:00",
    }),
    latitude: 48.05499,
    longitude: 8.459909,
    altitude: 60,
    category: categories[3],
    user: userprofiles[0],
    icon_id: 13,
  },
];

export const sensors = [...httpSensors, ...ttnSensors];

export const parsedSensors: PublicSensorType[] = [
  ...sensors.map(sensor => {
    return {
      ...sensor,
      authorName:
        userprofiles.find(profile => profile.id === sensor.user_id)
          ?.display_name || "",
      categoryName:
        categories.find(category => category.id === sensor.category_id)?.name ||
        "",
      parsedRecords: parseSensorRecords(sensor.records),
    };
  }),
];

export const curatedSensors: PublicSensorType[] = [
  {
    ...httpSensors[0],
    authorName: userprofiles[0].display_name || "",
    parsedRecords: parseSensorRecords(httpSensors[0].records),
    categoryName: "CO2",
  },
  {
    ...httpSensors[1],
    authorName: userprofiles[0].display_name || "",
    parsedRecords: parseSensorRecords(httpSensors[1].records),
    categoryName: "Temperatur",
  },
  {
    ...httpSensors[2],
    authorName: userprofiles[0].display_name || "",
    parsedRecords: parseSensorRecords(httpSensors[2].records),
    categoryName: "Luftdruck",
  },
];
