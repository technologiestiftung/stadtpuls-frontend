import { fakeRecords } from "./records";

export const fakeProjects = [
  {
    id: 10,
    name: "Project 11",
    description:
      "Temperaturmessung den Räumlichkeiten der Technologiestiftung Berlin in der Grunewaldstraße",
    location: "Berlin",
    devices: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        records: fakeRecords.map(({ device, ...record }) => record),
      },
    ],
  },
  {
    id: 19,
    name: "Project 10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [
      {
        records: [
          { recordedAt: "2021-04-14T00:00:00+00:00", measurements: null },
        ],
      },
    ],
  },
  {
    id: 18,
    name: "Project 9",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [],
  },
  {
    id: 17,
    name: "Project 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [{ records: [] }],
  },
  {
    id: 16,
    name: "Project 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [],
  },
  {
    id: 15,
    name: "Project 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [],
  },
  {
    id: 14,
    name: "Project 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [{ records: [] }],
  },
  {
    id: 13,
    name: "Project 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [{ records: [] }],
  },
  {
    id: 12,
    name: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [
      {
        records: [
          { recordedAt: "2021-04-14T00:00:00+00:00", measurements: null },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Berlin",
    devices: [
      {
        records: [
          { recordedAt: "2021-04-14T00:00:00+00:00", measurements: null },
        ],
      },
    ],
  },
];
