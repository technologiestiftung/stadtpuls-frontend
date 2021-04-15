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
import { allProjectsRecordsData } from "./supabaseData";
import { createV1ApiUrl } from "../lib/requests/createV1ApiUrl";
import { createV2ApiUrl } from "../lib/requests/createV2ApiUrl";
import { getSupabaseCredentials } from "../auth/supabase";

const { data: projectsData } = projectsResponse;
const { data: project1DevicesData } = project1Devices;
const { data: project2DevicesData } = project2Devices;
const { data: device1RecordsData } = device1Records;
const { data: device2RecordsData } = device2Records;
const { data: device3RecordsData } = device3Records;
const { data: device4RecordsData } = device4Records;

const supabaseHandlers = [
  rest.get(
    createV2ApiUrl(
      `/records?select=id%2CrecordedAt%2Cmeasurements%2Clongitude%2Clatitude%2Caltitude%2Cdevice%3AdeviceId%28id%2CexternalId%2Cname%2Cproject%3AprojectId%28id%2Cname%2Cdescription%2CcreatedAt%2Clocation%2Cconnectype%2Ccategory%3AcategoryId%28id%2Cname%2Cdescription%29%29%29&device.project.id=eq.10`
    ),
    (_req, res, ctx) => {
      return res(
        ctx.status(201, "Mocked status"),
        ctx.json(allProjectsRecordsData)
      );
    }
  ),
];

const apiHandlers = [
  rest.get(createV1ApiUrl(`/projects`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: projectsData, meta: "mocked" })
    );
  }),
  rest.get(createV1ApiUrl(`/projects/1/devices`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: project1DevicesData, meta: "mocked" })
    );
  }),
  rest.get(createV1ApiUrl(`/projects/2/devices`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: project2DevicesData, meta: "mocked" })
    );
  }),
  rest.get(createV1ApiUrl(`/devices/1/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device1RecordsData, meta: "mocked" })
    );
  }),
  rest.get(createV1ApiUrl(`/devices/2/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device2RecordsData, meta: "mocked" })
    );
  }),
  rest.get(createV1ApiUrl(`/devices/3/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device3RecordsData, meta: "mocked" })
    );
  }),
  rest.get(createV1ApiUrl(`/devices/4/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device4RecordsData, meta: "mocked" })
    );
  }),
];

const { url } = getSupabaseCredentials();
const authHandlers = [
  rest.post(`${url}/auth/v1/magiclink`, (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json({ data: {} }));
  }),
  rest.post(`${url}/auth/v1/user`, (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({
        data: {
          app_metadata: { provider: "email" },
          aud: "authenticated",
          confirmation_sent_at: "2021-04-11T17:22:25.10306Z",
          confirmed_at: "2021-04-11T17:22:55.1755Z",
          created_at: "2021-04-11T17:22:25.098621Z",
          email: "name@example.com",
          id: "42c6507b-ea89-494f-8e5a-e5c1306c0595",
          last_sign_in_at: "2021-04-11T17:47:01.206917Z",
          recovery_sent_at: "2021-04-11T17:42:46.173802Z",
          role: "authenticated",
          updated_at: "2021-04-11T17:22:25.098632Z",
          user_metadata: {},
        },
      })
    );
  }),
];

export const handlers = [...apiHandlers, ...supabaseHandlers, ...authHandlers];
