import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import moment from "moment";

export const getSensorRecords = ({
  sensorId,
  numberOfRecords = 10,
  firstRecordDate = moment().subtract(10, "days").toISOString(),
  lastRecordDate,
}: {
  sensorId: number;
  numberOfRecords?: number;
  firstRecordDate?: string;
  lastRecordDate?: string;
}): definitions["records"][] => {
  const startDate = moment.parseZone(firstRecordDate);
  const endDate = lastRecordDate
    ? moment.parseZone(lastRecordDate)
    : moment.parseZone(startDate).add(10, "days");
  const stepInMillis = Math.abs(
    Math.floor(endDate.diff(startDate) / (numberOfRecords - 1))
  );

  return Array.from(Array(numberOfRecords)).map((_, index) => {
    const recordDate = moment.parseZone(
      startDate.valueOf() + index * stepInMillis
    );

    return {
      id: sensorId + index,
      recorded_at: recordDate.toISOString(),
      measurements: [
        recordDate.hours() * recordDate.minutes() * recordDate.seconds(),
      ],
      sensor_id: sensorId,
    };
  });
};
