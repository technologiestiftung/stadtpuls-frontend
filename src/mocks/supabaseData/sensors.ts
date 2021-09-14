import { SensorQueryResponseType } from "@common/interfaces";
import { getSensorRecords } from "./records";
import { categories } from "./categories";
import { userprofiles } from "./userprofiles";

export const sensors: {
  withTtnIntegration: SensorQueryResponseType[];
  withHttpIntegration: SensorQueryResponseType[];
} = {
  withTtnIntegration: [
    {
      id: 1,
      created_at: "2020-12-01T07:00:00",
      connection_type: "ttn",
      external_id: "ttn-device-id-123",
      category_id: 1,
      user_id: userprofiles[0].id,
      records: getSensorRecords({
        sensorId: 1,
        numberOfRecords: 209,
        firstRecordDate: "2020-12-01T08:00:00",
      }),
      category: categories[0],
      user: userprofiles[0],
    },
    {
      id: 2,
      created_at: "2021-05-19T018:00:00",
      connection_type: "ttn",
      external_id: "ttn-device-id-456",
      category_id: 2,
      user_id: userprofiles[0].id,
      records: getSensorRecords({
        sensorId: 2,
        numberOfRecords: 708,
        firstRecordDate: "2021-05-19T019:00:00",
      }),
      category: categories[1],
      user: userprofiles[0],
    },
  ],
  withHttpIntegration: [
    {
      id: 3,
      created_at: "2021-08-25T011:00:00",
      connection_type: "http",
      category_id: 2,
      user_id: userprofiles[0].id,
      records: getSensorRecords({
        sensorId: 3,
        numberOfRecords: 190,
        firstRecordDate: "2021-08-25T012:00:00",
      }),
      category: categories[1],
      user: userprofiles[0],
    },
    {
      id: 4,
      created_at: "2021-09-03T008:00:00",
      connection_type: "http",
      category_id: 3,
      user_id: userprofiles[0].id,
      records: getSensorRecords({
        sensorId: 4,
        numberOfRecords: 5,
        firstRecordDate: "2021-09-03T009:00:00",
      }),
      category: categories[2],
      user: userprofiles[0],
    },
    {
      id: 5,
      created_at: "2021-09-12T022:00:00",
      connection_type: "http",
      category_id: 4,
      user_id: userprofiles[0].id,
      records: getSensorRecords({
        sensorId: 5,
        numberOfRecords: 452,
        firstRecordDate: "2021-09-12T023:00:00",
      }),
      category: categories[3],
      user: userprofiles[0],
    },
  ],
};
