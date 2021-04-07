import {
  ProjectResponse,
  DeviceResponse,
  RecordsResponse,
} from "../lib/requests";

export const projectsResponse: ProjectResponse = {
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

export const project1Devices: DeviceResponse = {
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

export const project2Devices: DeviceResponse = {
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

export const device1Records: RecordsResponse = {
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

export const device2Records: RecordsResponse = {
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

export const device3Records: RecordsResponse = {
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

export const device4Records: RecordsResponse = {
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
