import { FC } from "react";
import { usePublicSensors } from "@lib/hooks/usePublicSensors";
import { useRouter } from "next/router";
import { SensorsMap } from "@components/SensorsMap";
import { useSensorsRecords } from "@lib/hooks/useSensorsRecords";

interface SensorsOverviewPropType {
  totalSensors: number;
}

export const MAX_SENSORS_PER_PAGE = 30;

const SensorsOverview: FC<SensorsOverviewPropType> = () => {
  const { reload } = useRouter();

  const { sensors, error, isLoading } = usePublicSensors();
  const ids = sensors.map(({ id }) => id);
  const { sensorsRecordsMap } = useSensorsRecords(ids);
  const sensorsAreThere =
    !error && Array.isArray(sensors) && sensors.length > 0;

  if (error?.message === "JWT expired") reload();

  const sensorsToDisplay = !isLoading && sensorsAreThere ? sensors : [];
  return (
    <div className='pt-[62px]'>
      <SensorsMap
        error={error || undefined}
        sensors={sensorsToDisplay.map(s => ({
          ...s,
          parsedRecords: sensorsRecordsMap[s.id],
        }))}
        sensorsAreLoading={isLoading}
      />
    </div>
  );
};

export default SensorsOverview;
