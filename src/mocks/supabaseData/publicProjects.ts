import { DateValueType } from "@common/interfaces";
import { ProjectsType } from "@common/types/supabase";
import { fakeDeviceRecords } from "./deviceRecords";

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

export const fakeDeviceWithFewRecords = {
  id: 1234,
  externalId: "device1234",
  projectId: 4567,
  records: [
    {
      id: 1,
      deviceId: 1234,
      recordedAt: "2020-12-01T08:00:00",
      measurements: [28.5],
    },
    {
      id: 2,
      deviceId: 1234,
      recordedAt: "2020-12-02T15:00:00",
      measurements: [24.1],
    },
    {
      id: 3,
      deviceId: 1234,
      recordedAt: "2020-12-03T22:00:00",
      measurements: [20.9],
    },
  ],
};

export const fakeDeviceWithRecords = {
  id: 1,
  externalId: "device1",
  projectId: 10,
  records: fakeDeviceRecords,
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
