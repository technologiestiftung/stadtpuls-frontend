import { DeviceLineChartFilters } from "@components/DeviceLineChartFilters";
import { LineChart } from "@components/LineChart";
import { TextLink } from "@components/TextLink";
import { createDateValueArray } from "@lib/dateUtil";
import {
  ParsedSensorType,
  parseSensorRecords,
} from "@lib/hooks/usePublicSensors";
import { getSensorData } from "@lib/requests/getSensorData";
import DownloadIcon from "../../../public/images/icons/16px/arrowDownWithHalfSquare.svg";
import moment from "moment";
import "moment/locale/de";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useCallback, useState } from "react";
import { SensorPageHeaderWithData } from "@components/SensorPageHeader/withData";
import { createCSVStructure, downloadCSVString } from "@lib/downloadCsvUtil";
import { Alert } from "@components/Alert";
import { MAX_RENDERABLE_VALUES as MAX_RENDERABLE_VALUES_LINE_CHART } from "@components/LinePath";
import { getPublicSensors } from "@lib/requests/getPublicSensors";
import { useRouter } from "next/router";
import { SensorPageHeaderLoadingSkeleton } from "@components/SensorPageHeaderLoadingSkeleton";
import { RecordsTable } from "@components/RecordsTable";
import { getRecordsBySensorId } from "@lib/requests/getRecordsBySensorId";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";

moment.locale("de-DE");

const today = new Date();
today.setHours(0, 0, 0, 0);
const tenDaysAgo = new Date();
tenDaysAgo.setDate(today.getDate() - 10);
today.setHours(0, 0, 0, 0);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const sensorId =
      typeof params?.id === "string" ? parseInt(params.id, 10) : null;
    if (!sensorId || Array.isArray(sensorId)) return { notFound: true };

    const sensor = await getSensorData(sensorId);

    if (!sensor || sensor.authorUsername !== params?.username)
      return { notFound: true };
    const { records } = await getRecordsBySensorId(`${sensorId}`);

    if (!records) return { notFound: true };
    return { props: { sensor, records, error: null }, revalidate: 60 };
  } catch (error) {
    const { details } = error as { details: string };
    if (details && details.startsWith("Results contain 0 rows")) {
      return { notFound: true };
    }
    throw error;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { sensors } = await getPublicSensors();
  const paths = sensors.map(sensor => ({
    params: { id: `${sensor.id}`, username: sensor.authorUsername },
  }));
  return {
    paths: paths,
    fallback: true,
  };
};

const numberFormatter = new Intl.NumberFormat("de-DE", {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  notation: "compact",
  compactDisplay: "short",
});

const SensorPage: FC<{
  sensor?: ParsedSensorType | null;
  records: (Omit<definitions["records"], "measurements"> & {
    measurements: number[];
  })[];
}> = ({ sensor, records: rawRecords }) => {
  const { isFallback } = useRouter();
  const [chartWidth, setChartWidth] = useState<number | undefined>(undefined);
  const [chartHeight, setChartHeight] = useState<number | undefined>(undefined);
  const [currentDatetimeRange, setCurrentDatetimeRange] = useState<{
    startDateTimeString: string | undefined;
    endDateTimeString: string | undefined;
  }>({
    startDateTimeString: undefined,
    endDateTimeString: undefined,
  });
  const records = parseSensorRecords(rawRecords || []);
  const requestedRecordsCount = records.length;
  const parsedAndSortedRecords = createDateValueArray(records);

  const chartWrapper = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const { width } = node.getBoundingClientRect();
    setChartWidth(width || 0);
    setChartHeight(width / 2);
  }, []);

  const handleDownload = useCallback((): void => {
    if (isFallback || !sensor?.id || records.length === 0) return;
    const CSVTitle = `sensor-${sensor.id}`;

    const CSVData = createCSVStructure(
      records.map(dateValue => ({
        id: +dateValue.id,
        recorded_at: dateValue.date.toISOString(),
        measurements: [dateValue.value],
        sensor_id: sensor.id,
      }))
    );

    downloadCSVString(CSVData, CSVTitle);
  }, [sensor?.id, records, isFallback]);

  const sensorToRender = !isFallback && sensor;
  return (
    <>
      {sensorToRender ? (
        <SensorPageHeaderWithData initialSensor={sensorToRender} />
      ) : (
        <SensorPageHeaderLoadingSkeleton />
      )}
      <div className='container mx-auto max-w-8xl mb-32 px-4'>
        <div>
          <div className='flex justify-between flex-wrap gap-4 pb-8'>
            <DeviceLineChartFilters
              startDateTimeString={currentDatetimeRange.startDateTimeString}
              endDateTimeString={currentDatetimeRange.endDateTimeString}
              onDatetimeRangeChange={vals => setCurrentDatetimeRange(vals)}
            />
            {(requestedRecordsCount || 0) > 0 && (
              <div className='md:pt-4 lg:pt-8'>
                <span className='inline-flex gap-2 place-items-center'>
                  <DownloadIcon className='text-black' />
                  <TextLink
                    onClick={() => {
                      void handleDownload();
                    }}
                  >
                    Herunterladen (CSV)
                  </TextLink>
                </span>
              </div>
            )}
          </div>
          {typeof requestedRecordsCount !== "undefined" &&
            requestedRecordsCount > MAX_RENDERABLE_VALUES_LINE_CHART && (
              <Alert
                message={
                  <>
                    Das Diagramm kann maximal{" "}
                    <mark className='px-1 py-0.5 font-mono font-bold bg-gray-100 text-blue'>
                      {MAX_RENDERABLE_VALUES_LINE_CHART}
                    </mark>{" "}
                    Datenpunkte darstellen. Im gewählten Zeitraum befinden sich{" "}
                    <mark className='px-1 py-0.5 font-mono font-bold bg-gray-100 text-blue'>
                      {requestedRecordsCount}
                    </mark>{" "}
                    Datenpunkte. Die ältesten werden nicht dargestellt.
                  </>
                }
              />
            )}
          <div
            className={[
              "pt-4 pb-8 mt-6 flex space-between flex-wrap gap-6",
              "border-t border-gray-100",
            ].join(" ")}
          >
            <div className={["text-sm text-gray-500"].join(" ")}>
              {numberFormatter.format(records.length)}
              {` von `}
              {sensor?.parsedRecords?.length || 0}
              {` Messwerte`}
            </div>
          </div>
        </div>
        <div
          id='chart-wrapper'
          ref={chartWrapper}
          className='w-full max-w-full mt-4 md:min-h-[340px]'
        >
          {records.length > 0 && (
            <LineChart
              width={chartWidth || 1200}
              height={chartHeight || 400}
              yAxisUnit=''
              xAxisUnit='Messdatum'
              data={parsedAndSortedRecords}
              startDateTimeString={currentDatetimeRange.startDateTimeString}
              endDateTimeString={currentDatetimeRange.endDateTimeString}
            />
          )}
          {records.length === 0 && (
            <div className='prose p-8 max-w-full h-80 grid place-content-center place-items-center'>
              <p>Keine Daten für die aktuelle Filterkonfiguration</p>
            </div>
          )}
        </div>
        {records.length > 0 && (
          <div className='mt-16'>
            <RecordsTable
              isEditable={false}
              data={parsedAndSortedRecords.reverse()}
              onRecordsDelete={() => undefined}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SensorPage;
