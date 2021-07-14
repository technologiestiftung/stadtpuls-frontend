import { DateValueType } from "@common/interfaces";
import { ProjectsType } from "@common/types/supabase";

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

export const fakeDeviceWithRecords = {
  id: 1,
  externalId: "device1",
  projectId: 10,
  records: [
    {
      id: 1,
      deviceId: 1,
      recordedAt: "2021-04-19T10:23:59.615+00:00",
      measurements: [24.1],
    },
    {
      id: 2,
      deviceId: 1,
      recordedAt: "2021-04-19T10:13:52.588+00:00",
      measurements: [24.1],
    },
    {
      id: 3,
      deviceId: 1,
      recordedAt: "2021-04-19T10:13:52.588+00:00",
      measurements: [24.1],
    },
    {
      id: 4,
      deviceId: 1,
      recordedAt: "2021-04-19T10:13:52.588+00:00",
      measurements: [24.1],
    },
    {
      id: 5,
      deviceId: 1,
      recordedAt: "2021-04-19T10:03:46.128+00:00",
      measurements: [24.1],
    },
    {
      id: 6,
      deviceId: 1,
      recordedAt: "2021-04-19T09:53:39.626+00:00",
      measurements: [23.6],
    },
    {
      id: 7,
      deviceId: 1,
      recordedAt: "2021-04-19T09:43:32.865+00:00",
      measurements: [23.2],
    },
    {
      id: 8,
      deviceId: 1,
      recordedAt: "2021-04-19T09:33:26.318+00:00",
      measurements: [24.2],
    },
    {
      id: 9,
      deviceId: 1,
      recordedAt: "2021-04-19T09:23:20.77+00:00",
      measurements: [24.3],
    },
    {
      id: 10,
      deviceId: 1,
      recordedAt: "2021-04-19T09:13:14.033+00:00",
      measurements: [23.9],
    },
    {
      id: 10,
      deviceId: 1,
      recordedAt: "2021-04-19T09:03:07.163+00:00",
      measurements: [23.6],
    },
    {
      id: 11,
      deviceId: 1,
      recordedAt: "2021-04-19T08:53:01.113+00:00",
      measurements: [24.2],
    },
    {
      id: 12,
      deviceId: 1,
      recordedAt: "2021-04-19T08:42:55.588+00:00",
      measurements: [23.9],
    },
    {
      id: 13,
      deviceId: 1,
      recordedAt: "2021-04-19T08:32:49.073+00:00",
      measurements: [23.7],
    },
    {
      id: 14,
      deviceId: 1,
      recordedAt: "2021-04-19T08:22:41.768+00:00",
      measurements: [23.9],
    },
    {
      id: 15,
      deviceId: 1,
      recordedAt: "2021-04-19T08:12:34.375+00:00",
      measurements: [23.6],
    },
    {
      id: 16,
      deviceId: 1,
      recordedAt: "2021-04-19T08:02:28.862+00:00",
      measurements: [23.9],
    },
    {
      id: 17,
      deviceId: 1,
      recordedAt: "2021-04-19T07:42:14.593+00:00",
      measurements: [24.2],
    },
    {
      id: 18,
      deviceId: 1,
      recordedAt: "2021-04-19T07:32:08.202+00:00",
      measurements: [24.3],
    },
    {
      id: 19,
      deviceId: 1,
      recordedAt: "2021-04-19T07:22:00.983+00:00",
      measurements: [24.2],
    },
    {
      id: 20,
      deviceId: 1,
      recordedAt: "2021-04-19T07:11:54.761+00:00",
      measurements: [24],
    },
    {
      id: 21,
      deviceId: 1,
      recordedAt: "2021-04-19T07:01:48.508+00:00",
      measurements: [23.6],
    },
    {
      id: 22,
      deviceId: 1,
      recordedAt: "2021-04-19T06:51:41.119+00:00",
      measurements: [23.5],
    },
    {
      id: 23,
      deviceId: 1,
      recordedAt: "2021-04-19T06:41:34.705+00:00",
      measurements: [23.8],
    },
    {
      id: 24,
      deviceId: 1,
      recordedAt: "2021-04-19T06:31:29.209+00:00",
      measurements: [23.4],
    },
    {
      id: 25,
      deviceId: 1,
      recordedAt: "2021-04-19T06:21:22.019+00:00",
      measurements: [23.3],
    },
    {
      id: 26,
      deviceId: 1,
      recordedAt: "2021-04-19T06:11:16.474+00:00",
      measurements: [24.3],
    },
    {
      id: 27,
      deviceId: 1,
      recordedAt: "2021-04-19T06:01:10.168+00:00",
      measurements: [24.5],
    },
    {
      id: 28,
      deviceId: 1,
      recordedAt: "2021-04-19T05:51:02.807+00:00",
      measurements: [24.5],
    },
    {
      id: 29,
      deviceId: 1,
      recordedAt: "2021-04-19T05:40:55.557+00:00",
      measurements: [24.5],
    },
    {
      id: 30,
      deviceId: 1,
      recordedAt: "2021-04-19T05:30:48.595+00:00",
      measurements: [24.5],
    },
    {
      id: 31,
      deviceId: 1,
      recordedAt: "2021-04-19T05:20:41.475+00:00",
      measurements: [24.5],
    },
    {
      id: 32,
      deviceId: 1,
      recordedAt: "2021-04-19T05:10:34.796+00:00",
      measurements: [24.5],
    },
    {
      id: 33,
      deviceId: 1,
      recordedAt: "2021-04-19T05:00:28.037+00:00",
      measurements: [24.5],
    },
    {
      id: 34,
      deviceId: 1,
      recordedAt: "2021-04-19T04:50:22.546+00:00",
      measurements: [24.5],
    },
    {
      id: 35,
      deviceId: 1,
      recordedAt: "2021-04-19T04:40:16.19+00:00",
      measurements: [24.5],
    },
    {
      id: 36,
      deviceId: 1,
      recordedAt: "2021-04-19T04:30:10.441+00:00",
      measurements: [24.5],
    },
    {
      id: 37,
      deviceId: 1,
      recordedAt: "2021-04-19T04:20:03.166+00:00",
      measurements: [24.5],
    },
    {
      id: 38,
      deviceId: 1,
      recordedAt: "2021-04-19T04:09:56.027+00:00",
      measurements: [24.5],
    },
    {
      id: 39,
      deviceId: 1,
      recordedAt: "2021-04-19T03:59:49.639+00:00",
      measurements: [24.5],
    },
    {
      id: 40,
      deviceId: 1,
      recordedAt: "2021-04-19T03:49:43.734+00:00",
      measurements: [24.6],
    },
    {
      id: 41,
      deviceId: 1,
      recordedAt: "2021-04-19T03:39:37.245+00:00",
      measurements: [24.6],
    },
    {
      id: 42,
      deviceId: 1,
      recordedAt: "2021-04-19T03:29:30.146+00:00",
      measurements: [24.7],
    },
    {
      id: 43,
      deviceId: 1,
      recordedAt: "2021-04-19T03:19:23.861+00:00",
      measurements: [24.8],
    },
    {
      id: 44,
      deviceId: 1,
      recordedAt: "2021-04-19T03:09:16.724+00:00",
      measurements: [24.8],
    },
    {
      id: 45,
      deviceId: 1,
      recordedAt: "2021-04-19T02:59:09.827+00:00",
      measurements: [24.8],
    },
    {
      id: 46,
      deviceId: 1,
      recordedAt: "2021-04-19T02:49:03.083+00:00",
      measurements: [24.8],
    },
    {
      id: 47,
      deviceId: 1,
      recordedAt: "2021-04-19T02:38:57.32+00:00",
      measurements: [24.8],
    },
    {
      id: 48,
      deviceId: 1,
      recordedAt: "2021-04-19T02:28:51.11+00:00",
      measurements: [24.8],
    },
    {
      id: 49,
      deviceId: 1,
      recordedAt: "2021-04-19T02:18:45.622+00:00",
      measurements: [24.8],
    },
  ],
};

export const fakeProjects: ProjectsType[] = [
  {
    id: 10,
    name: "Temperatur Grunewaldstraße",
    description:
      "Temperaturmessung den Räumlichkeiten der Technologiestiftung Berlin in der Grunewaldstraße",
    location: "La Tour-de-Peilz",
    devices: [fakeDeviceWithRecords],
    categoryId: 1,
    category: {
      id: 1,
      name: "Temperatur",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
    user: {
      id: "1",
      createdAt: "2019-04-14T00:00:00+00:00",
      name: "Dennis",
    },
  },
  {
    id: 19,
    name: "Plan of Simplicity",
    description:
      "What is once well done is done forever. - Henry David Thoreau",
    location: "Santiago",
    devices: [
      {
        id: 2,
        externalId: "device2",
        projectId: 19,
        records: [
          {
            id: 49,
            deviceId: 2,
            recordedAt: "2021-04-14T00:00:00+00:00",
            measurements: [1],
          },
        ],
      },
    ],
    categoryId: 2,
    category: {
      id: 2,
      name: "CO2",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
    user: {
      id: "2",
      createdAt: "2019-04-14T00:00:00+00:00",
      name: "Hans Peter Schmidt De La Vega",
    },
  },
  {
    id: 18,
    name: "Shadow of Struggle",
    description:
      "Do not fear death so much but rather the inadequate life. - Bertolt Brecht",
    location: "Kiev",
    devices: [],
    categoryId: 3,
    category: {
      id: 3,
      name: "Lautstärke",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
    user: {
      id: "3",
      createdAt: "2019-04-14T00:00:00+00:00",
      name: "Lu",
    },
  },
  {
    id: 17,
    name: "Poison Thing",
    description:
      "Ambition is the path to success. Persistence is the vehicle you arrive in. - Bill Bradley",
    devices: [
      { id: 3, externalId: "device3", projectId: 17, records: [] },
      { id: 4, externalId: "device4", projectId: 17, records: [] },
      { id: 5, externalId: "device5", projectId: 17, records: [] },
      { id: 6, externalId: "device6", projectId: 17, records: [] },
      { id: 7, externalId: "device7", projectId: 17, records: [] },
    ],
    categoryId: 4,
    category: {
      id: 4,
      name: "PAXCounter",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
    user: {
      id: "4",
      createdAt: "2019-04-14T00:00:00+00:00",
    },
  },
  {
    id: 16,
    name: "August",
    description: "",
    location: "Tokyo",
    devices: [],
    categoryId: 4,
    category: {
      id: 4,
      name: "PAXCounter",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
  },
  {
    id: 15,
    name: "Delicate Collapse",
    description:
      "Sadness flies away on the wings of time. - Jean de La Fontaine",
    location: "Nairobi",
    devices: [],
    categoryId: 4,
    category: {
      id: 4,
      name: "Druck",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
  },
  {
    id: 14,
    name: "Simple Broadcast",
    description:
      "Through perseverance many people win success out of what seemed destined to be certain failure. - Benjamin Disraeli",
    location: "New Dehli",
    devices: [{ id: 8, externalId: "device8", projectId: 14, records: [] }],
    categoryId: 4,
    category: {
      id: 4,
      name: "Temperatur",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
  },
  {
    id: 13,
    name: "doge blessedupleasant",
    description:
      "Love is too young to know what conscience is. - William Shakespeare",
    location: "Berlin",
    devices: [{ id: 9, externalId: "device9", projectId: 13, records: [] }],
    categoryId: 4,
    category: {
      id: 4,
      name: "Luftfeuchtigkeit",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
  },
  {
    id: 12,
    name: "Mercenary Quiet",
    description:
      "Life isn’t about getting and having, it’s about giving and being. - Kevin Kruse",
    location: "New York",
    devices: [
      {
        id: 10,
        externalId: "device10",
        projectId: 12,
        records: [
          {
            id: 1234,
            deviceId: 10,
            recordedAt: "2021-04-14T00:00:00+00:00",
            measurements: [1],
          },
        ],
      },
    ],
    categoryId: 4,
    category: {
      id: 4,
      name: "CO2",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
  },
  {
    id: 11,
    name: "Draco Annoying",
    description:
      "Prayer does not change God, but it changes him who prays. - Soren Kierkegaard",
    location: "Hamburg",
    devices: [
      {
        id: 11,
        externalId: "device11",
        projectId: 11,
        records: [
          {
            id: 1234,
            deviceId: 11,
            recordedAt: "2021-04-14T00:00:00+00:00",
            measurements: [1],
          },
        ],
      },
    ],
    categoryId: 4,
    category: {
      id: 4,
      name: "CO2",
      description: "description",
    },
    createdAt: "2019-04-14T00:00:00+00:00",
    connectype: "ttn",
  },
];
