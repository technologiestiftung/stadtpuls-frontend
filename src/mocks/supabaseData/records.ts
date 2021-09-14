import { definitions } from "@common/types/supabase";
import moment from "moment";

const getRandomNumber = (min = 0, max = 50): number => {
  const num = Math.random() * (max - min) + min;
  return Math.floor(num);
};

export const getSensorRecords = (options: {
  sensorId: number;
  numberOfRecords?: number;
  firstRecordDate?: string;
}): definitions["records"][] => {
  return new Array(options.numberOfRecords || 50).fill(null).map((_, index) => {
    const firstRecordDate = new Date(
      options.firstRecordDate || "2021-09-01T01:00:00"
    );
    const recordDate = moment(firstRecordDate).add(index, "days");

    const data = {
      id: options.sensorId + index,
      recorded_at: recordDate.toISOString(),
      measurements: [getRandomNumber()],
      sensor_id: options.sensorId,
    };

    return data;
  });
};
