import { FC } from "react";
import { SensorsMap } from "@components/SensorsMap";
import { GetStaticProps } from "next";
import { getPublicSensors } from "@lib/requests/getPublicSensors";
import {
  ParsedSensorType,
  parseSensorRecords,
} from "@lib/hooks/usePublicSensors";
import { getSensorsRecords } from "@lib/requests/getSensorsRecords";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";

type RecordType = Omit<definitions["records"], "measurements"> & {
  measurements: number[];
};

interface SensorsOverviewPropType {
  sensors: ParsedSensorType[];
  sensorsRecordsMap: Record<string, RecordType[]>;
}

export const MAX_SENSORS_PER_PAGE = 30;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { sensors } = await getPublicSensors();
    const sensorsRecordsMap = await getSensorsRecords(
      sensors.map(({ id }) => id)
    );
    return { props: { sensors, sensorsRecordsMap, error: null } };
  } catch (error) {
    console.error(JSON.stringify(error));
    return { notFound: true };
  }
};

const SensorsOverview: FC<SensorsOverviewPropType> = ({
  sensors,
  sensorsRecordsMap,
}) => {
  const sensorsAreThere = Array.isArray(sensors) && sensors.length > 0;

  const sensorsToDisplay = sensorsAreThere ? sensors : [];
  return (
    <div className='pt-[62px]'>
      <SensorsMap
        sensors={sensorsToDisplay.map(s => {
          const parsedRecords = parseSensorRecords(
            sensorsRecordsMap[s.id] || []
          );
          return {
            ...s,
            parsedRecords,
          };
        })}
        sensorsAreLoading={false}
      />
    </div>
  );
};

export default SensorsOverview;
