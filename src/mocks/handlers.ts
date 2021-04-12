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
import { createApiUrl } from "../lib/requests/createApiUrl";
import { getSupabaseCredentials } from "../auth/supabase";

const { data: projectsData } = projectsResponse;
const { data: project1DevicesData } = project1Devices;
const { data: project2DevicesData } = project2Devices;
const { data: device1RecordsData } = device1Records;
const { data: device2RecordsData } = device2Records;
const { data: device3RecordsData } = device3Records;
const { data: device4RecordsData } = device4Records;

const apiHandlers = [
  rest.get(createApiUrl(`/projects`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: projectsData, meta: "mocked" })
    );
  }),
  rest.get(createApiUrl(`/projects/1/devices`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: project1DevicesData, meta: "mocked" })
    );
  }),
  rest.get(createApiUrl(`/projects/2/devices`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: project2DevicesData, meta: "mocked" })
    );
  }),
  rest.get(createApiUrl(`/devices/1/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device1RecordsData, meta: "mocked" })
    );
  }),
  rest.get(createApiUrl(`/devices/2/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device2RecordsData, meta: "mocked" })
    );
  }),
  rest.get(createApiUrl(`/devices/3/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device3RecordsData, meta: "mocked" })
    );
  }),
  rest.get(createApiUrl(`/devices/4/records`), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({ data: device4RecordsData, meta: "mocked" })
    );
  }),
];

const { url } = getSupabaseCredentials();
const authHandlers = [
  rest.get(`${url}/auth/v1/magiclink`, (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json({ data: {} }));
  }),
  rest.get(`${url}/auth/v1/user`, (_req, res, ctx) => {
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

export const handlers = [...apiHandlers, ...authHandlers];
