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
import {
  allProjectsRecordsData,
  publicCategories,
  publicProjectsData,
  userData,
  userProjects,
  getDevice,
  getProject,
  refreshToken,
  authToken,
} from "./supabaseData";
import { createV1ApiUrl } from "../lib/requests/createV1ApiUrl";
import { createV2ApiUrl } from "../lib/requests/createV2ApiUrl";
import { getSupabaseCredentials } from "../auth/supabase";
import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";
import { DevicesType, ProjectsType, UsersType } from "@common/types/supabase";
import { fakeGeocondingData } from "./mapboxData";

const { data: projectsData } = projectsResponse;
const { data: project1DevicesData } = project1Devices;
const { data: project2DevicesData } = project2Devices;
const { data: device1RecordsData } = device1Records;
const { data: device2RecordsData } = device2Records;
const { data: device3RecordsData } = device3Records;
const { data: device4RecordsData } = device4Records;

const mapBoxGeocodingHandlers = [
  rest.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/Berlin.json?access_token=${
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""
    }`,
    (_req, res, ctx) => {
      return res(
        ctx.status(201, "Mocked status"),
        ctx.json(fakeGeocondingData)
      );
    }
  ),
];

const tokenApiHandlers = [
  rest.get(createTokenApiUrl({ projectId: "10" }), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json({
        data: [
          { niceId: 1, description: "Lorem ipsum dolor.", projectId: 10 },
          { niceId: 2, description: "Sit amet consectetur.", projectId: 10 },
          { niceId: 3, description: "Lipsum amet dolor.", projectId: 10 },
        ],
      })
    );
  }),
  rest.post(createTokenApiUrl(), (_req, res, ctx) => {
    return res(
      ctx.status(201, "Mocked status"),
      ctx.text(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYTNmMjY3My0wNWNkLTRiNjMtYTJiZC1lZjhmYWY5MzFlZWYiLCJwcm9qZWN0SWQiOjEwLCJkZXNjcmlwdGlvbiI6Im15IGZhbmN5IHRva2VuIiwianRpIjoiOTlmMGNjY2EtYTA3MC00MjBmLTk0N2EtZDk3Y2QxYTAzN2RmIiwiaXNzIjoidGVjaG5vbG9naWVzdGlmdHVuZy1iZXJsaW4uZGUiLCJpYXQiOjE2MTkwNzkzOTB9.IBZ4qrsi8ibAUcUi8LsZtiWSE1Q5DzjFJZMPwzMZrKA"
      )
    );
  }),
];

const supabaseHandlers = [
  rest.get(createV2ApiUrl("/categories"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json(publicCategories));
  }),
  rest.get(createV2ApiUrl("/projects"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const select = query.get("select");
    // const offset = query.get("offset");
    // const limit = query.get("limit");
    const recordsLimit = query.get("devices.records.limit");
    const recordsOrder = query.get("devices.records.order");
    const userId = query.get("userId")?.slice(3);
    if (
      recordsLimit == "500" &&
      recordsOrder == "recordedAt.desc.nullslast" &&
      // limit == "10" &&
      // offset == "0" &&
      select ==
        "id,name,description,location,devices(records(recordedAt,measurements))"
    )
      return res(
        ctx.set("content-range", "0-9/14"),
        ctx.status(201, "Mocked status"),
        ctx.json(publicProjectsData)
      );
    else if (
      select ==
        "id,name,description,connectype,location,category:categoryId(id,name,description),devices(id,externalId,name,records(id,recordedAt))" &&
      userId == authToken.currentSession.user.id
    )
      return res(ctx.status(201, "Mocked status"), ctx.json(userProjects));
    else return res(ctx.status(404, "Not found"));
  }),
  rest.get(createV2ApiUrl("/users"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const select = query.get("select");
    const id = query.get("id")?.slice(3);
    if (select == "name" && id == authToken.currentSession.user.id)
      return res(ctx.status(201, "Mocked status"), ctx.json(userData));
    else return res(ctx.status(404, "Not found"));
  }),
  //Devices add update delete
  rest.post<DevicesType[]>(createV2ApiUrl("/devices"), (req, res, ctx) => {
    const payload = req.body[0];

    if (payload.projectId >= 1 && 4 >= payload.projectId)
      return res(
        ctx.status(201, "Mocked status"),
        ctx.json([{ ...payload, id: 12 }])
      );
    else
      return res(
        ctx.status(409, "Conflict"),
        ctx.json({
          hint: null,
          details: 'Key is not present in table "projects".',
          code: "23503",
          message:
            'insert or update on table "devices" violates foreign key constraint "devices_projectId_fkey"',
        })
      );
  }),
  rest.patch<DevicesType>(createV2ApiUrl("/devices"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const id = Number(query.get("id")?.slice(3));
    const userId = query.get("userId")?.slice(3);
    const device = getDevice(id);
    const payload = req.body;
    if (userId == authToken.currentSession.user.id && device)
      return res(
        ctx.status(201, "Mocked status"),
        ctx.json([
          {
            ...device,
            ...payload,
          },
        ])
      );
    else return res(ctx.status(404, "Not found"));
  }),
  rest.delete(createV2ApiUrl("/devices"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const id = Number(query.get("id")?.slice(3));
    const userId = query.get("userId")?.slice(3);
    const device = getDevice(id);
    if (userId == authToken.currentSession.user.id)
      return res(ctx.status(201, "Mocked status"), ctx.json(device));
    else return res(ctx.status(404, "Not found"));
  }),
  //Projects add update delete
  rest.post<ProjectsType[]>(createV2ApiUrl("/projects"), (req, res, ctx) => {
    const payload = req.body[0];
    const createdAt = new Date().toISOString();
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json([{ ...payload, createdAt, id: 5 }])
    );
  }),
  rest.patch<ProjectsType>(createV2ApiUrl("/projects"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const id = Number(query.get("id")?.slice(3));
    const userId = query.get("userId")?.slice(3);
    const project = getProject(id);
    const payload = req.body;
    if (userId == authToken.currentSession.user.id && project)
      return res(
        ctx.status(201, "Mocked status"),
        ctx.json([
          {
            ...project,
            ...payload,
          },
        ])
      );
    else return res(ctx.status(404, "Not found"));
  }),
  rest.delete(createV2ApiUrl("/projects"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const id = Number(query.get("id")?.slice(3));
    const userId = query.get("userId")?.slice(3);
    const project = getProject(id);
    if (userId == authToken.currentSession.user.id)
      return res(ctx.status(201, "Mocked status"), ctx.json(project));
    else return res(ctx.status(404, "Not found"));
  }),
  //Auth
  rest.post(
    "https://dyxublythmmlsositxtg.supabase.co/auth/v1/token?grant_type=refresh_token",
    (_req, res, ctx) => {
      return res(ctx.status(201, "Mocked status"), ctx.json(refreshToken));
    }
  ),
  //User
  rest.post(createV2ApiUrl("/rpc/delete_user"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"));
  }),
  rest.patch<UsersType>(createV2ApiUrl("/users"), (req, res, ctx) => {
    const query = req.url.searchParams;
    const payload = req.body;

    const id = query.get("id")?.slice(3);
    const createdAt = new Date().toISOString();
    if (id == authToken.currentSession.user.id)
      return res(
        ctx.status(201, "Mocked status"),
        ctx.json([
          {
            ...payload,
            id,
            createdAt,
            role: "maker",
          },
        ])
      );
    else return res(ctx.status(404, "Not found"));
  }),
  //other
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
  rest.delete(createV2ApiUrl("/authtokens"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json([]));
  }),
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

export const handlers = [
  ...mapBoxGeocodingHandlers,
  ...apiHandlers,
  ...supabaseHandlers,
  ...authHandlers,
  ...tokenApiHandlers,
];
