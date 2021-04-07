import { rest } from "msw";
import {
  projectsResponse,
  project1Devices,
  project2Devices,
  device1Records,
  device2Records,
  device3Records,
  device4Records,
} from "./data";
import { API_VERSION } from "../lib/requests";

const { data: projectsData } = projectsResponse;
const { data: project1DevicesData } = project1Devices;
const { data: project2DevicesData } = project2Devices;
const { data: device1RecordsData } = device1Records;
const { data: device2RecordsData } = device2Records;
const { data: device3RecordsData } = device3Records;
const { data: device4RecordsData } = device4Records;

export const handlers = [
  rest.get(`/api/${API_VERSION}/projects`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: projectsData, meta: "mocked" })
    );
  }),
  rest.get(`/api/${API_VERSION}/projects/1/devices`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: project1DevicesData, meta: "mocked" })
    );
  }),
  rest.get(`/api/${API_VERSION}/projects/2/devices`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: project2DevicesData, meta: "mocked" })
    );
  }),
  rest.get(`/api/${API_VERSION}/devices/1/records`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device1RecordsData, meta: "mocked" })
    );
  }),
  rest.get(`/api/${API_VERSION}/devices/2/records`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device2RecordsData, meta: "mocked" })
    );
  }),
  rest.get(`/api/${API_VERSION}/devices/3/records`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device3RecordsData, meta: "mocked" })
    );
  }),
  rest.get(`/api/${API_VERSION}/devices/4/records`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device4RecordsData, meta: "mocked" })
    );
  }),
];
