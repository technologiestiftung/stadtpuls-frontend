import { DataTable } from "@components/DataTable";
import { DeviceLineChartFilters } from "@components/DeviceLineChartFilters";
import { DropdownMenu } from "@components/DropdownMenu";
import { LineChart } from "@components/LineChart";
import { TextLink } from "@components/TextLink";
import { createDateValueArray } from "@lib/dateUtil";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { useSensorLastRecordDate } from "@lib/hooks/useSensorLastRecordDate";
import { useSensorRecords } from "@lib/hooks/useSensorRecords";
import { useSensorRecordsCount } from "@lib/hooks/useSensorRecordsCount";
import { GetRecordsOptionsType } from "@lib/requests/getRecordsBySensorId";
import { getSensorData } from "@lib/requests/getSensorData";
import DownloadIcon from "../../public/images/icons/16px/arrowDownWithHalfSquare.svg";
import moment from "moment";
import { GetServerSideProps } from "next";
import React, { FC, useCallback, useEffect, useState } from "react";
import { SensorPageHeaderWithData } from "@components/SensorPageHeader/withData";
import { definitions } from "@common/types/supabase";
import { useDownloadQueue } from "@lib/hooks/useDownloadQueue";
import { downloadCSVString } from "@lib/downloadCsvUtil";
import { Alert } from "@components/Alert";
import { MAX_RENDERABLE_VALUES as MAX_RENDERABLE_VALUES_LINE_CHART } from "@components/LinePath";

const today = new Date();
today.setHours(0, 0, 0, 0);
const tenDaysAgo = new Date();
tenDaysAgo.setDate(today.getDate() - 10);
today.setHours(0, 0, 0, 0);

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const sensorId = context.query.id;
    if (!sensorId || Array.isArray(sensorId)) return { notFound: true };

    const sensor = await getSensorData(parseInt(sensorId, 10));
    return { props: { sensor, error: null } };
  } catch (error) {
    return { notFound: true };
  }
};

const numberFormatter = new Intl.NumberFormat("de-DE", {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  notation: "compact",
  compactDisplay: "short",
});

const getCategoryUnit = (
  category: definitions["categories"]["name"] | string | undefined
): string => {
  switch (category) {
    case "Temperatur":
      return "°C";
    case "CO2":
      return "ppm";
    case "Luftfeuchtigkeit":
      return "%";
    case "Lautstärke":
      return "dB";
    case "Druck":
      return "hPa";
    case "PAXCounter":
      return "Personen";
    default:
      return "";
  }
};

const SensorPage: FC<{
  sensor: ParsedSensorType;
}> = ({ sensor }) => {
  const { pushToQueue } = useDownloadQueue();
  const [chartWidth, setChartWidth] = useState<number | undefined>(undefined);
  const [chartHeight, setChartHeight] = useState<number | undefined>(undefined);
  const [currentDatetimeRange, setCurrentDatetimeRange] = useState<{
    startDateTimeString: string | undefined;
    endDateTimeString: string | undefined;
  }>({
    startDateTimeString: tenDaysAgo.toISOString(),
    endDateTimeString: today.toISOString(),
  });
  const { lastRecordDate } = useSensorLastRecordDate(sensor.id);
  const { count: recordsCount } = useSensorRecordsCount(sensor.id);
  const {
    records,
    recordsCount: requestedRecordsCount,
    error: recordsFetchError,
    isLoading: recordsAreLoading,
  } = useSensorRecords({
    sensorId: sensor.id,
    startDateString: currentDatetimeRange.startDateTimeString,
    endDateString: currentDatetimeRange.endDateTimeString,
    maxRows: MAX_RENDERABLE_VALUES_LINE_CHART,
  });
  const parsedAndSortedRecords = createDateValueArray(records);

  useEffect(() => {
    if (!lastRecordDate) return;
    setCurrentDatetimeRange({
      startDateTimeString: moment
        .parseZone(lastRecordDate)
        .subtract(7, "days")
        .toISOString(),
      endDateTimeString: moment.parseZone(lastRecordDate).toISOString(),
    });
  }, [lastRecordDate, setCurrentDatetimeRange]);

  const chartWrapper = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const { width } = node.getBoundingClientRect();
    setChartWidth(width || 0);
    setChartHeight(width / 2);
  }, []);

  const handleDownload = useCallback(
    (options?: GetRecordsOptionsType): void => {
      const CSVTitle = !options
        ? `${moment.parseZone().format("YYYY-MM-DD")}-sensor-${
            sensor.id
          }-all-data`
        : `${moment
            .parseZone(currentDatetimeRange.startDateTimeString)
            .format("YYYY-MM-DD")}-to-${moment
            .parseZone(currentDatetimeRange.endDateTimeString)
            .format("YYYY-MM-DD")}-sensor-${sensor.id}`;
      pushToQueue({
        id: sensor.id,
        title: CSVTitle,
        totalCount: recordsCount || 0,
        options,
        callback: ({ result }) => result && downloadCSVString(result, CSVTitle),
      });
    },
    [
      currentDatetimeRange.endDateTimeString,
      currentDatetimeRange.startDateTimeString,
      pushToQueue,
      recordsCount,
      sensor.id,
    ]
  );

  return (
    <>
      <SensorPageHeaderWithData initialSensor={sensor} />
      <div className='container mx-auto max-w-8xl mb-32 px-4'>
        <div>
          <div className='flex justify-between flex-wrap gap-4 pb-8'>
            <DeviceLineChartFilters
              startDateTimeString={currentDatetimeRange.startDateTimeString}
              endDateTimeString={currentDatetimeRange.endDateTimeString}
              onDatetimeRangeChange={vals => setCurrentDatetimeRange(vals)}
            />
            <div className='md:pt-4 lg:pt-8'>
              <DropdownMenu
                items={[
                  {
                    id: "all",
                    title: "Alle Daten",
                    onClick: () => {
                      void handleDownload();
                    },
                  },
                  {
                    id: "filtered",
                    title: "Gefilterte Daten",
                    disabled: records.length === 0,
                    onClick: () => {
                      void handleDownload({
                        startDate: currentDatetimeRange.startDateTimeString,
                        endDate: currentDatetimeRange.endDateTimeString,
                      });
                    },
                  },
                ]}
              >
                <span className='inline-flex gap-2 place-items-center'>
                  <DownloadIcon className='text-black' />
                  <TextLink>Herunterladen (CSV)</TextLink>
                </span>
              </DropdownMenu>
            </div>
          </div>
          {requestedRecordsCount &&
            requestedRecordsCount > MAX_RENDERABLE_VALUES_LINE_CHART && (
              <Alert
                type='warning'
                title='Achtung'
                message={
                  <>
                    Das Diagramm kann maximal{" "}
                    <mark className='px-1 py-0.5 font-mono font-bold bg-warning bg-opacity-50'>
                      {MAX_RENDERABLE_VALUES_LINE_CHART}
                    </mark>{" "}
                    Datenpunkte darstellen. Im gewählten Zeitraum befinden sich{" "}
                    <mark className='px-1 py-0.5 font-mono font-bold bg-warning bg-opacity-50'>
                      {requestedRecordsCount}
                    </mark>{" "}
                    Datenpunkte. <b>Die ältesten werden nicht dargestellt.</b>
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
              {recordsCount || 0}
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
              yAxisUnit={getCategoryUnit(sensor.categoryName)}
              xAxisUnit='Messdatum'
              data={parsedAndSortedRecords.map(({ id, date, value }) => ({
                id,
                date: date.toISOString(),
                value,
              }))}
              startDateTimeString={currentDatetimeRange.startDateTimeString}
              endDateTimeString={currentDatetimeRange.endDateTimeString}
            />
          )}
          {recordsFetchError && (
            <div className='prose p-8 max-w-full h-80 grid place-content-center place-items-center'>
              <p>{recordsFetchError.message}</p>
            </div>
          )}
          {!recordsFetchError && !recordsAreLoading && records.length === 0 && (
            <div className='prose p-8 max-w-full h-80 grid place-content-center place-items-center'>
              <p>Keine Daten für die aktuelle Filterkonfiguration</p>
            </div>
          )}
          {!recordsFetchError && recordsAreLoading && (
            <div className='prose p-8 max-w-full h-80 grid place-content-center place-items-center'>
              <p>Daten werden geladen...</p>
            </div>
          )}
        </div>
        {records.length > 0 && (
          <div className='mt-16'>
            <DataTable data={parsedAndSortedRecords.reverse()} />
          </div>
        )}
      </div>
    </>
  );
};

export default SensorPage;
