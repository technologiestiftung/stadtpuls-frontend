import { FetchResponse } from "./../common/types";
import {
  DateValueType,
  DeviceType,
  ProjectType,
  RecordType,
} from "./../common/interfaces";

const getFakeLineChartDates = (): DateValueType[] => [
  {
    date: "2021-04-11T12:10:01.908Z",
    value: 25,
  },
  {
    date: "2021-04-10T12:10:01.908Z",
    value: 99,
  },
  {
    date: "2021-04-09T12:10:01.908Z",
    value: 75,
  },
  {
    date: "2021-04-08T12:10:01.908Z",
    value: 12,
  },
  {
    date: "2021-04-07T12:10:01.908Z",
    value: 0,
  },
  {
    date: "2021-04-06T12:10:01.908Z",
    value: 33,
  },
];

export const fakeCuratedProjects = [
  {
    id: 1,
    name: "Temperatur Grundewaldstraße",
    description:
      "Es war einmal die Temperatur Bemeßung in die Grundewaldstraße",
    devicesNumber: 5,
    authorName: "CityLAB",
    category: "Temperatur",
    location: "Berlin",
    records: getFakeLineChartDates(),
  },
  {
    id: 2,
    name: "CO2 Elbphilharmonie Hamburg.",
    description:
      "Es war einmal die CO2 Bemeßung in die Elbphilharmonie Hamburg.",
    devicesNumber: 4,
    authorName: "Elbphilharmonie",
    category: "CO2",
    location: "Hamburg",
    records: getFakeLineChartDates(),
  },
  {
    id: 3,
    name: "PAXCounter Schokoladenmuseum Köln",
    description:
      "Es war einmal die PAXCounter Bemeßung in der Schokoladenmuseum Köln",
    devicesNumber: 1,
    authorName: "Schokoladenmuseum",
    category: "PAXCounter",
    location: "Köln",
    records: getFakeLineChartDates(),
  },
];

type ProjectsResponseType = FetchResponse<"projects", ProjectType[]>;
export const projectsResponse: ProjectsResponseType = {
  data: {
    projects: [
      {
        id: 1,
        title: "Test project A",
        city: "Berlin",
        description:
          "This is a description for project A. This is a description. This is a description. This is a description.",
        ttnAppId: "aaa",
        userId: 1,
      },
      {
        id: 2,
        title: "Test project B",
        city: "Berlin",
        description:
          "This is a description for project B. This is a description. This is a description. This is a description.",
        ttnAppId: "bbb",
        userId: 2,
      },
    ],
  },
};

type DevicesResponseType = FetchResponse<"devices", DeviceType[]>;
export const project1Devices: DevicesResponseType = {
  data: {
    devices: [
      {
        description: "device description 1",
        id: 1,
        latitude: 52.487142,
        longitude: 13.465942,
        projectId: 1,
        ttnDeviceId: "testTtnDeviceId",
        records: [],
      },
      {
        description: "device description 2",
        id: 2,
        latitude: 52.492518,
        longitude: 13.464215,
        projectId: 1,
        ttnDeviceId: "testTtnDeviceId",
        records: [],
      },
      {
        description: "device description 3",
        id: 3,
        latitude: 52.488623,
        longitude: 13.477193,
        projectId: 1,
        ttnDeviceId: "testTtnDeviceId",
        records: [],
      },
    ],
  },
};

export const project2Devices: DevicesResponseType = {
  data: {
    devices: [
      {
        description: "device description 4",
        id: 4,
        latitude: 52.496731,
        longitude: 13.40713,
        projectId: 2,
        ttnDeviceId: "testTtnDeviceId",
        records: [],
      },
    ],
  },
};

type RecordsResponseType = FetchResponse<"records", RecordType[]>;
export const device1Records: RecordsResponseType = {
  data: {
    records: [
      {
        id: 1,
        deviceId: 1,
        recordedAt: "2020-10-14T15:47:03.354Z",
        value: 50,
      },
      {
        id: 2,
        deviceId: 1,
        recordedAt: "2020-10-15T15:47:03.354Z",
        value: 75,
      },
      {
        id: 3,
        deviceId: 1,
        recordedAt: "2020-10-16T15:47:03.354Z",
        value: 25,
      },
      {
        id: 4,
        deviceId: 1,
        recordedAt: "2020-10-17T15:47:03.354Z",
        value: 61,
      },
      {
        id: 5,
        deviceId: 1,
        recordedAt: "2020-10-18T15:47:03.354Z",
        value: 79,
      },
    ],
  },
};

export const device2Records: RecordsResponseType = {
  data: {
    records: [
      {
        id: 6,
        deviceId: 1,
        recordedAt: "2020-10-14T15:47:03.354Z",
        value: 22,
      },
      {
        id: 7,
        deviceId: 1,
        recordedAt: "2020-10-15T15:47:03.354Z",
        value: 49,
      },
      {
        id: 8,
        deviceId: 1,
        recordedAt: "2020-10-16T15:47:03.354Z",
        value: 12,
      },
      {
        id: 9,
        deviceId: 1,
        recordedAt: "2020-10-17T15:47:03.354Z",
        value: 88,
      },
    ],
  },
};

export const device3Records: RecordsResponseType = {
  data: {
    records: [
      {
        id: 10,
        deviceId: 1,
        recordedAt: "2020-10-14T15:47:03.354Z",
        value: 74,
      },
      {
        id: 11,
        deviceId: 1,
        recordedAt: "2020-10-15T15:47:03.354Z",
        value: 24,
      },
      {
        id: 12,
        deviceId: 1,
        recordedAt: "2020-10-17T15:47:03.354Z",
        value: 92,
      },
    ],
  },
};

export const device4Records: RecordsResponseType = {
  data: {
    records: [
      {
        id: 13,
        deviceId: 4,
        recordedAt: "2020-10-14T15:47:03.354Z",
        value: 18,
      },
      {
        id: 14,
        deviceId: 4,
        recordedAt: "2020-10-15T15:47:03.354Z",
        value: 65,
      },
      {
        id: 15,
        deviceId: 4,
        recordedAt: "2020-10-16T15:47:03.354Z",
        value: 78,
      },
      {
        id: 16,
        deviceId: 4,
        recordedAt: "2020-10-17T15:47:03.354Z",
        value: 55,
      },
      {
        id: 17,
        deviceId: 4,
        recordedAt: "2020-10-18T15:47:03.354Z",
        value: 70,
      },
    ],
  },
};
