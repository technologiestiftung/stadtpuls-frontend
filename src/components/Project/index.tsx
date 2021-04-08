/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState, useCallback } from "react";
import { useStoreState } from "../../state/hooks";
import { getDevicesByProjectId } from "@lib/requests/getDevicesByProjectId";
import { getRecordsByDeviceId } from "@lib/requests/getRecordsByDeviceId";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  jsx,
  Grid,
  Container,
  Box,
  Card,
  IconButton,
  Text,
  Input,
  Label,
  Button,
} from "theme-ui";
import { downloadMultiple } from "@lib/download-handlers";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { ProjectSummary } from "../ProjectSummary";
import { DataTable } from "../DataTable";
import { IconButton as DownloadButton } from "../IconButton";
import {
  ProjectType,
  DeviceType,
  MarkerType,
  CompleteProjectType,
  RecordType,
} from "../../common/interfaces";
import { RadioTabs } from "../RadioTabs";
import { LineChart } from "../visualization/LineChart";
import { createDateValueArray } from "../../lib/utils";
import { ApiInfo } from "../ApiInfo";
import { MarkerMap } from "../MarkerMap";
import { NotFoundPage } from "../NotFoundPage";

const downloadIcon = "./images/download.svg";

export const Project: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const selectedProject: ProjectType | undefined = useStoreState(state =>
    state.projects.selected(Number(id))
  );

  const [completeProjectData, setCompleteProjectData] = useState<
    CompleteProjectType | undefined
  >(undefined);

  const [selectedDeviceId, setSelectedDeviceId] = useState<number | undefined>(
    undefined
  );

  const [selectedDevice, setSelectedDevice] = useState<DeviceType | undefined>(
    undefined
  );

  const MIN_NUMBER_OF_RECORDS_TO_DISPLAY = 100;

  const [
    numberOfRecordsToDisplay,
    setNumberOfRecordsToDisplay,
  ] = useState<number>(MIN_NUMBER_OF_RECORDS_TO_DISPLAY);

  const [lineChartData, setLineChartData] = useState<RecordType[] | undefined>(
    undefined
  );

  const [markerData, setMarkerData] = useState<MarkerType[] | undefined>(
    undefined
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!selectedProject) return;
      const devices = await getDevicesByProjectId(id);
      Promise.all(
        devices.map(async (device: DeviceType) => {
          const records = await getRecordsByDeviceId(device.id);
          return {
            ...device,
            records: records,
          };
        })
      )
        .then((results: DeviceType[]) => {
          const completeData = {
            ...selectedProject,
            devices: results,
          };
          setLoading(false);
          setCompleteProjectData(completeData);
          setSelectedDeviceId(completeData.devices[0].id);
        })
        .catch(error => console.error(error));
    };

    fetchData();
  }, [selectedProject, id]);

  useEffect(() => {
    if (!completeProjectData) return;
    const device = completeProjectData.devices.find(
      device => device.id === selectedDeviceId
    );

    if (!device) return;
    setSelectedDevice(device);

    const initialNumberOfRecordsToDisplay =
      device.records.length < 500 ? device.records.length : 500;
    setNumberOfRecordsToDisplay(initialNumberOfRecordsToDisplay);
  }, [selectedDeviceId, completeProjectData]);

  useEffect(() => {
    if (!selectedDevice) return;
    setLineChartData(
      selectedDevice.records.filter(
        (_record, i) => i < numberOfRecordsToDisplay
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDevice]);

  useEffect(() => {
    if (!completeProjectData) return;

    const devicesWithCoordinates = completeProjectData.devices.filter(
      (device: DeviceType) => {
        const latLonFieldsExist = device.latitude && device.longitude;
        return (
          latLonFieldsExist &&
          device.latitude !== null &&
          device.longitude !== null
        );
      }
    );

    setMarkerData(
      // TODO: type this properly
      devicesWithCoordinates.map(device => {
        return {
          latitude: device.latitude || 0,
          longitude: device.longitude || 0,
          id: device.id,
          isActive: device.id === selectedDeviceId,
        };
      })
    );
  }, [completeProjectData, selectedDeviceId]);

  // =================================================================
  // CHART DIMENSIONS
  // =================================================================
  const [chartWidth, setChartWidth] = useState<number | undefined>(undefined);
  const [chartHeight, setChartHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    window.addEventListener("resize", updateChartDimensions);
    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  const chartWrapper = useCallback(node => {
    if (!node) return;
    setChartWidth(node.getBoundingClientRect().width);
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

  // =================================================================
  // MAP DIMENSIONS
  // =================================================================
  const [mapWidth, setMapWidth] = useState<number | undefined>(undefined);
  const [mapHeight, setMapHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    window.addEventListener("resize", updateMapDimensions);
    return () => {
      window.removeEventListener("resize", updateMapDimensions);
    };
  }, []);

  const mapWrapper = useCallback(node => {
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

  // =================================================================
  // DOWNLOAD HANLDERS
  // =================================================================
  const handleDownload = (): void => {
    if (!completeProjectData) return;
    downloadMultiple(
      completeProjectData.devices.map((device: DeviceType) => device.records),
      completeProjectData.devices.map((device: DeviceType) =>
        device.description ? device.description : "Kein Titel"
      )
    );
  };

  const handleMarkerSelect = (deviceId: number): void => {
    setSelectedDeviceId(deviceId);
  };

  const handleUpdateRecords = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    event.preventDefault();

    if (!selectedDevice) return;
    setLineChartData(
      selectedDevice.records.filter(
        (_record, i) => i < numberOfRecordsToDisplay
      )
    );
  };

  return (
    <React.Fragment>
      {!loading && !selectedProject && <NotFoundPage />}
      {selectedProject && (
        <Container mt={[0, 5, 5]} p={4}>
          <Grid gap={[4, null, 6]} columns={[1, "1fr 2fr"]}>
            <Box>
              <Link href='/'>
                <a sx={{ textDecoration: "none", color: "text" }}>
                  <IconButton
                    aria-label='Zurück zur Übersicht'
                    bg='background'
                    sx={{
                      borderRadius: "50%",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ArrowBackIcon color='primary' />
                  </IconButton>
                </a>
              </Link>
              <Box mt={2}>
                {completeProjectData && (
                  <ProjectSummary
                    title={completeProjectData.title}
                    description={completeProjectData.description}
                    noOfDevices={
                      completeProjectData.devices
                        ? completeProjectData.devices.length
                        : 0
                    }
                  />
                )}
              </Box>
              <Box mt={4}>
                {completeProjectData && (
                  <ApiInfo
                    entries={completeProjectData.devices.map(
                      (device: DeviceType) => {
                        return {
                          name: device.description
                            ? device.description
                            : "Kein Titel",
                          id: device.id,
                        };
                      }
                    )}
                  />
                )}
              </Box>
              <Box mt={4}>
                {completeProjectData && (
                  <DownloadButton
                    value={"Alle Daten downloaden"}
                    iconSource={downloadIcon}
                    clickHandler={handleDownload}
                  />
                )}
              </Box>
              <Card mt={5} bg='muted'>
                <div
                  id='map-wrapper'
                  ref={mapWrapper}
                  sx={{ width: "100%", height: "200px" }}
                >
                  {markerData && markerData.length === 0 && (
                    <Text>Keine Geoinformationen verfügbar.</Text>
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
              </Card>
              {completeProjectData && (
                <Text mt={2}>Standpunkt(e): {completeProjectData.city}</Text>
              )}
            </Box>
            <Box>
              <Card p={0}>
                {completeProjectData &&
                  completeProjectData.devices &&
                  selectedDevice && (
                    <Grid
                      columns={["auto max-content"]}
                      p={3}
                      sx={{
                        borderBottom: theme =>
                          `1px solid ${theme.colors.lightgrey}`,
                      }}
                    >
                      <RadioTabs
                        name={"devices"}
                        options={completeProjectData.devices.map(
                          (device: DeviceType) => {
                            return {
                              title: device.description
                                ? device.description
                                : "Kein Titel",
                              id: device.id,
                              isActive: device.id === selectedDeviceId,
                            };
                          }
                        )}
                        changeHandler={selected =>
                          setSelectedDeviceId(selected)
                        }
                      />
                      <Box sx={{ fontSize: 0 }}>
                        <Grid
                          as='dl'
                          columns={"100px 1fr"}
                          gap={2}
                          sx={{
                            rowGap: 2,
                            ">dd": {
                              marginLeft: 0,
                            },
                          }}
                        >
                          <dt>Letzter Eintrag:</dt>
                          <dd>
                            {selectedDevice.records.length &&
                            // TODO: Do not use hasOwnProperty here
                            // eslint-disable-next-line no-prototype-builtins
                            selectedDevice.records[0].hasOwnProperty(
                              "recordedAt"
                            )
                              ? new Date(
                                  Math.max(
                                    ...selectedDevice.records.map(e =>
                                      Date.parse(e.recordedAt)
                                    )
                                  )
                                ).toLocaleDateString()
                              : ""}
                          </dd>
                          <dt>Messwerte:</dt>
                          <dd>
                            {selectedDevice && selectedDevice.records.length}
                          </dd>
                        </Grid>
                        {selectedDevice && (
                          <Grid
                            as='form'
                            columns={"100px 1fr auto"}
                            gap={2}
                            onSubmit={handleUpdateRecords}
                          >
                            <Label htmlFor='records-amount'>Angezeigt:</Label>
                            <Input
                              type='number'
                              name='records-amount'
                              value={numberOfRecordsToDisplay}
                              min='1'
                              max={`${selectedDevice.records.length}`}
                              step='1'
                              id='records-amount'
                              color='primary'
                              sx={{ fontWeight: "bold" }}
                              onChange={event =>
                                setNumberOfRecordsToDisplay(
                                  Number(event.target.value)
                                )
                              }
                            />
                            <Button
                              variant='text'
                              type='submit'
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <ArrowForwardIcon
                                fontSize={"small"}
                                sx={{ color: "primary" }}
                              />
                            </Button>
                          </Grid>
                        )}
                      </Box>
                    </Grid>
                  )}
                <Box id='chart-wrapper' ref={chartWrapper} mt={4}>
                  {chartWidth && chartHeight && lineChartData && (
                    <LineChart
                      width={chartWidth}
                      height={chartHeight}
                      data={createDateValueArray(lineChartData)}
                    />
                  )}
                </Box>
              </Card>
              {selectedDevice && selectedDevice.records && (
                <DataTable
                  data={selectedDevice.records}
                  title={selectedDevice.description}
                />
              )}
            </Box>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
};
