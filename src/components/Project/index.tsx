import React, { useEffect, useState, useCallback, FC } from "react";
import { downloadMultiple } from "@lib/downloadCsvUtil";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ProjectSummary } from "../ProjectSummary";
import { DataTable } from "../DataTable";
import { MarkerType, RecordType } from "../../common/interfaces";
import { LineChart } from "../LineChart";
import { createDateValueArray } from "@lib/dateUtil";
import { ApiInfo } from "../ApiInfo";
import { MarkerMap } from "../MarkerMap";
import { ViewportType } from "@common/types/ReactMapGl";
import { getGeocodedViewportByString } from "@lib/requests/getGeocodedViewportByString";
import {
  CategoriesType,
  RecordsType,
  ProjectsType,
} from "@common/types/supabase";
import { Button } from "@components/Button";
import { FormSelect } from "@components/FormSelect";
import { DeviceLineChartFilters } from "@components/DeviceLineChartFilters";
import { useDeviceRecords } from "@lib/hooks/useDeviceRecords";
import { useDeviceLastRecordDate } from "@lib/hooks/useDeviceLastRecordDate";
import moment from "moment";
import { useDeviceRecordsCount } from "@lib/hooks/useDeviceRecordsCount";

const today = new Date();
today.setHours(0, 0, 0, 0);
const tenDaysAgo = new Date();
tenDaysAgo.setDate(today.getDate() - 10);
today.setHours(0, 0, 0, 0);

const rawRecordToRecord = (rawRecord: RecordsType): RecordType => ({
  id: rawRecord.id,
  recordedAt: rawRecord.recordedAt || "",
  value: rawRecord.measurements ? rawRecord.measurements[0] : 0,
});

const getCategoryUnit = (
  category: CategoriesType["name"] | string | undefined
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

export const Project: FC<ProjectsType> = project => {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number>(0);
  const selectedDevice = project?.devices?.[selectedDeviceIndex];
  const [currentDatetimeRange, setCurrentDatetimeRange] = useState<{
    startDateTimeString: string | undefined;
    endDateTimeString: string | undefined;
  }>({
    startDateTimeString: tenDaysAgo.toISOString(),
    endDateTimeString: today.toISOString(),
  });

  const {
    records,
    error: recordsFetchError,
    isLoading: recordsAreLoading,
  } = useDeviceRecords({
    deviceId: selectedDevice?.id,
    startDateString: currentDatetimeRange.startDateTimeString,
    endDateString: currentDatetimeRange.endDateTimeString,
  });

  const { lastRecordDate } = useDeviceLastRecordDate(selectedDevice?.id);
  const { count: recordsCount } = useDeviceRecordsCount(selectedDevice?.id);

  const [markerData, setMarkerData] = useState<MarkerType[]>([]);

  const [locationViewport, setLocationViewport] = useState<Pick<
    ViewportType,
    "latitude" | "longitude"
  > | null>(null);

  useEffect(() => {
    const devicesWithCoordinates = project?.devices?.filter(device => {
      return (
        Boolean(device?.records?.[0]?.latitude) &&
        Boolean(device?.records?.[0]?.longitude)
      );
    });

    if (devicesWithCoordinates?.length === 0 && locationViewport) {
      setMarkerData([
        {
          ...locationViewport,
          id: 0,
          isActive: true,
        },
      ]);
      return;
    }

    setMarkerData(
      devicesWithCoordinates?.map((device, idx) => {
        return {
          latitude: device?.records?.[0].latitude || 0,
          longitude: device?.records?.[0].longitude || 0,
          id: idx,
          isActive: idx === selectedDeviceIndex,
        };
      }) || []
    );
  }, [project.devices, selectedDeviceIndex, locationViewport]);

  const [chartWidth, setChartWidth] = useState<number | undefined>(undefined);
  const [chartHeight, setChartHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    if (!project.location) return;
    void getGeocodedViewportByString(project.location).then(
      viewport => isMounted && setLocationViewport(viewport)
    );
    return () => {
      isMounted = false;
    };
  }, [project.location]);

  useEffect(() => {
    window.addEventListener("resize", updateChartDimensions);
    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  const chartWrapper = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    setChartWidth(node.getBoundingClientRect().width || 0);
    setChartHeight(node.getBoundingClientRect().width / 2);
  }, []);

  const updateChartDimensions = (): void => {
    const boundingRect: HTMLDivElement | null = document.querySelector(
      "#chart-wrapper"
    );
    if (!boundingRect) return;

    setChartWidth(boundingRect.offsetWidth);
    setChartHeight(boundingRect.offsetWidth / 2);
  };

  const [mapWidth, setMapWidth] = useState<number | undefined>(undefined);
  const [mapHeight, setMapHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    window.addEventListener("resize", updateMapDimensions);
    return () => {
      window.removeEventListener("resize", updateMapDimensions);
    };
  }, []);

  const mapWrapper = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    setMapWidth(node.getBoundingClientRect().width);
    setMapHeight(node.getBoundingClientRect().height);
  }, []);

  const updateMapDimensions = (): void => {
    const boundingRect: HTMLDivElement | null = document.querySelector(
      "#map-wrapper"
    );

    if (!boundingRect) return;
    setMapWidth(boundingRect.offsetWidth);
    setMapHeight(boundingRect.offsetHeight);
  };

  const handleDownload = (): void => {
    if (!project) return;
    downloadMultiple(
      project?.devices?.map(device => {
        return (
          device?.records?.map(rawRecordToRecord) || [
            { id: 0, recordedAt: "", value: 0 },
          ]
        );
      }) || [[{ id: 0, recordedAt: "", value: 0 }]],
      project?.devices?.map(device =>
        device.name ? device.name : "Kein Titel"
      ) || ["Kein Titel"]
    );
  };

  const handleMarkerSelect = (deviceIndex: number): void => {
    setSelectedDeviceIndex(deviceIndex);
  };

  return (
    <div className={["max-w-screen-xl", "p-4 mx-auto mt-0 md:mt-5"].join(" ")}>
      <div className='grid gap-4 md:gap-12 grid-cols-1 lg:grid-cols-7'>
        <div className='lg:col-span-2'>
          <a
            href='/projects'
            aria-label='Zurück zur Übersicht'
            className='rounded-full cursor-pointer'
          >
            <ArrowBackIcon />
          </a>
          <div className='mt-6'>
            <ProjectSummary
              title={project.name}
              description={project.description || ""}
              noOfDevices={project.devices ? project.devices.length : 0}
            />
          </div>
          <div className='mt-12'>
            <div
              id='map-wrapper'
              ref={mapWrapper}
              className={[
                "w-full h-52",
                "border border-gray-100",
                "bg-white",
              ].join(" ")}
            >
              {markerData && markerData.length === 0 && (
                <p className='ml-2 mt-2'>Koordinaten nicht verfügbar.</p>
              )}
              {mapWidth &&
                mapHeight &&
                markerData &&
                markerData.length >= 1 && (
                  <MarkerMap
                    markers={markerData}
                    clickHandler={handleMarkerSelect}
                    mapWidth={mapWidth}
                    mapHeight={mapHeight}
                  />
                )}
            </div>
          </div>
          {project && <p className='mt-2'>Standpunkt(e): {project.location}</p>}
          {project && project.devices && project.devices.length > 0 && (
            <>
              <div className='mt-16'>
                <ApiInfo
                  entries={project.devices.map(device => {
                    return {
                      label: device.name ? device.name : "Kein Titel",
                      domain: process.env.NEXT_PUBLIC_WEB_URL || "",
                      route: device.id
                        ? `api/v1/devices/${device.id}/records`
                        : "",
                    };
                  })}
                />
              </div>
              <div className='mt-6'>
                {project && (
                  <Button variant='primary' onClick={handleDownload}>
                    Alle Daten downloaden
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
        <div className='lg:col-span-5'>
          <div className='bg-white border border-gray-100 shadow'>
            {project &&
              project.devices &&
              project.devices[selectedDeviceIndex] && (
                <>
                  <div
                    className={[
                      "grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8",
                      "p-4 border-b border-gray-100",
                    ].join(" ")}
                  >
                    <FormSelect
                      label='Sensor'
                      name='device'
                      options={project.devices.map(device => ({
                        value: `${device.id}`,
                        name: device.name || "Kein Titel",
                      }))}
                      defaultValue={`${project.devices[selectedDeviceIndex].id}`}
                      onValueChange={(name: string): void => {
                        const newIdx =
                          project?.devices?.findIndex(
                            ({ id }) => id === parseInt(name, 10)
                          ) || 0;
                        setSelectedDeviceIndex(newIdx);
                      }}
                    />
                    <div>
                      <dl
                        className={[
                          "grid gap-2 grid-cols-[100px,1fr]",
                          "text-xs pt-8",
                        ].join(" ")}
                      >
                        <dt>Letzter Eintrag:</dt>
                        <dd className='ml-2'>
                          {lastRecordDate
                            ? moment(lastRecordDate).format("D. MMMM YYYY")
                            : "–"}
                        </dd>
                        <dt>Messwerte:</dt>
                        <dd className='ml-2'>{recordsCount || "–"}</dd>
                      </dl>
                    </div>
                  </div>
                  <DeviceLineChartFilters
                    startDateTimeString={
                      currentDatetimeRange.startDateTimeString
                    }
                    endDateTimeString={currentDatetimeRange.endDateTimeString}
                    onDatetimeRangeChange={vals =>
                      setCurrentDatetimeRange(vals)
                    }
                  />
                </>
              )}
            <div
              id='chart-wrapper'
              ref={chartWrapper}
              className='mt-4 md:min-h-[340px]'
            >
              {project &&
                project.devices &&
                project.devices.length > 0 &&
                chartWidth &&
                chartHeight &&
                !recordsFetchError &&
                !recordsAreLoading &&
                records.length > 0 && (
                  <LineChart
                    width={chartWidth}
                    height={chartHeight}
                    yAxisUnit={getCategoryUnit(project.category?.name)}
                    xAxisUnit='Messdatum'
                    data={createDateValueArray(records)}
                    startDateTimeString={
                      currentDatetimeRange.startDateTimeString
                    }
                    endDateTimeString={currentDatetimeRange.endDateTimeString}
                  />
                )}
              {project?.devices?.length === 0 && (
                <div className='prose p-8 max-w-full h-80 grid text-center items-center'>
                  <p>Dieses Projekt enthält noch keine Sensoren.</p>
                </div>
              )}
              {recordsFetchError && (
                <div className='prose p-8 max-w-full h-80 grid text-center items-center'>
                  <p>{recordsFetchError.message}</p>
                </div>
              )}
              {!recordsFetchError &&
                !recordsAreLoading &&
                records.length === 0 && (
                  <div className='prose p-8 max-w-full h-80 grid text-center items-center'>
                    <p>Keine Daten für die aktuelle Filterkonfiguration</p>
                  </div>
                )}
              {!recordsFetchError && recordsAreLoading && (
                <div className='prose p-8 max-w-full h-80 grid text-center items-center'>
                  <p>Daten werden geladen...</p>
                </div>
              )}
            </div>
          </div>
          {records.length > 0 && !recordsFetchError && selectedDevice && (
            <div className='border border-gray-100 shadow mt-16 p-0'>
              <DataTable
                data={records.map(rawRecordToRecord)}
                title={selectedDevice.name || ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
