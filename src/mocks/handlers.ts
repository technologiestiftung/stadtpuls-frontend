import { rest } from "msw";
import { refreshToken, authToken } from "./supabaseData";
import { parsedSensors, sensors } from "./supabaseData/sensors";
import { publicAccounts } from "./supabaseData/accounts";
import { createApiUrl } from "../lib/requests/createApiUrl";
import { getSupabaseCredentials } from "../auth/supabase";
import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";
import { definitions } from "@common/types/supabase";
import { fakeGeocondingData } from "./mapboxData";
import { fakeGithubUserData } from "./githubData";
import {
  SensorQueryResponseType,
  sensorQueryString,
} from "@lib/hooks/usePublicSensors";
import {
  AccountQueryResponseType,
  accountQueryString,
} from "@lib/hooks/usePublicAccounts";
import { categories } from "./supabaseData/categories";
import { userprofiles } from "./supabaseData/userprofiles";
import { getSensorRecords } from "./supabaseData/records";

const githubHandlers = [
  rest.get(`https://api.github.com/users/*`, (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json(fakeGithubUserData));
  }),
];

const mapBoxGeocodingHandlers = [
  rest.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/Berlin.json`,
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
  rest.get(createApiUrl("/categories"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json(categories));
  }),
  rest.get(createApiUrl("/records"), (req, res, ctx) => {
    const query = req.url.searchParams;
    const recordedAts = query.getAll("recorded_at");
    let firstRecordDate = recordedAts.find(a => a.startsWith("gte."));
    firstRecordDate = firstRecordDate
      ? firstRecordDate.replace("gte.", "")
      : undefined;
    let lastRecordDate = recordedAts.find(a => a.startsWith("lte."));
    lastRecordDate = lastRecordDate
      ? lastRecordDate.replace("lte.", "")
      : undefined;

    return res(
      ctx.status(201, "Mocked status"),
      ctx.json(
        getSensorRecords({ sensorId: 1, firstRecordDate, lastRecordDate })
      )
    );
  }),
  // Keeping this for now for inspiration for how to mock different query options. TODO: Delete as soon as it's not needed anymore
  /* rest.get(createApiUrl("/projects"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const select = query.get("select");
    // const offset = query.get("offset");
    const limit = query.get("limit");
    const recordsLimit = query.get("devices.records.limit");
    const recordsOrder = query.get("devices.records.order");
    const userId = query.get("userId")?.slice(3);
    const id = query.get("id")?.slice(3);
    if (
      recordsLimit == "500" &&
      recordsOrder == "recordedAt.desc.nullslast" &&
      // limit == "10" &&
      // offset == "0" &&
      select ==
        "id,name,description,location,devices(records(recordedAt,measurements)),user:userId(name),category:categoryId(name)"
    )
      return res(
        ctx.set("content-range", "0-9/14"),
        ctx.status(201, "Mocked status"),
        ctx.json(
          limit
            ? publicProjectsData.slice(0, parseInt(limit, 10))
            : publicProjectsData
        )
      );
    else if (
      select ==
        "id,name,description,connectype,location,category:categoryId(id,name,description),devices(id,externalId,name,records(id,recordedAt))" &&
      userId == authToken.currentSession.user.id
    )
      return res(ctx.status(201, "Mocked status"), ctx.json(userProjects));
    else if (
      select ==
        "id,name,connectype,createdAt,location,category:categoryId(id,name,description),devices(id,externalId,name,records(id,recordedAt,measurements,longitude,latitude,altitude))" &&
      id == "10"
    )
      return res(
        ctx.status(201, "Mocked status"),
        ctx.json(publicProjectsData[0])
      );
    else return res(ctx.status(404, "Not found"));
  }), */
  // Sensors add update delete
  rest.post<definitions["sensors"][]>(
    createApiUrl("/sensors"),
    (req, res, ctx) => {
      const payload = req.body[0];

      return res(
        ctx.status(201, "Mocked status"),
        ctx.json([{ ...payload, id: 12 }])
      );
    }
  ),
  rest.get<AccountQueryResponseType>(
    createApiUrl("/user_profiles"),
    (req, res, ctx) => {
      const query = req.url.searchParams;

      const select = query.get("select");
      const username = query.get("name")?.replace("eq.", "");
      const limit = query.get("limit");
      const recordsLimit = query.get("records.limit");

      // Regex removes whitespaces and line breaks. Necessary because accountQueryString is constructed as template literal
      const trimmedAccountSelectString = accountQueryString.replace(
        /(\r\n|\n|\r| )/gm,
        ""
      );

      const specificAccountDataRequested =
        select === trimmedAccountSelectString;
      const oneAccountRequestedById = specificAccountDataRequested && username;
      const limitedAccountsRequested = specificAccountDataRequested && limit;

      if (specificAccountDataRequested) {
        if (oneAccountRequestedById && username) {
          return res(
            ctx.status(201, "Mocked status"),
            ctx.json(
              publicAccounts.find(
                account => String(account.name) === String(username)
              ) as definitions["user_profiles"]
            )
          );
        }
        if (limitedAccountsRequested && limit) {
          const limitedAccounts = publicAccounts.slice(0, parseInt(limit, 10));
          const limitedAccountsWithLimitedRecords = limitedAccounts.map(
            account => {
              return recordsLimit
                ? {
                    ...account,
                    records: account.records.slice(
                      0,
                      parseInt(recordsLimit, 10) - 1
                    ),
                  }
                : { ...account };
            }
          );

          return recordsLimit
            ? res(
                ctx.status(201, "Mocked status"),
                ctx.json(limitedAccountsWithLimitedRecords)
              )
            : res(ctx.status(201, "Mocked status"), ctx.json(limitedAccounts));
        } else {
          return res(
            ctx.status(201, "Mocked status"),
            ctx.json(publicAccounts)
          );
        }
      }

      return res(ctx.status(201, "Mocked status"), ctx.json(publicAccounts));
    }
  ),
  rest.get<SensorQueryResponseType>(
    createApiUrl("/sensors"),
    (req, res, ctx) => {
      const query = req.url.searchParams;

      const select = query.get("select");
      const id = query.get("id")?.replace("eq.", "");
      const limit = query.get("limit");
      const recordsLimit = query.get("records.limit");

      // Regex removes whitespaces and line breaks. Necessary because sensorQueryString is constructed as template literal
      const trimmedSensorSelectString = sensorQueryString.replace(
        /(\r\n|\n|\r| )/gm,
        ""
      );

      const specificSensorDataRequested = select === trimmedSensorSelectString;
      const oneSensorRequestedById = specificSensorDataRequested && id;
      const limitedSensorsRequested = specificSensorDataRequested && limit;

      if (specificSensorDataRequested) {
        if (oneSensorRequestedById && id) {
          return res(
            ctx.status(201, "Mocked status"),
            ctx.json(
              sensors.find(
                sensor => sensor.id === parseInt(id, 10)
              ) as definitions["sensors"]
            )
          );
        }
        if (limitedSensorsRequested && limit) {
          const limitedSensors = sensors.slice(0, parseInt(limit, 10));
          const limitedSensorsWithLimitedRecords = limitedSensors.map(
            sensor => {
              return recordsLimit
                ? {
                    ...sensor,
                    records: sensor.records.slice(
                      0,
                      parseInt(recordsLimit, 10) - 1
                    ),
                  }
                : { ...sensor };
            }
          );

          return recordsLimit
            ? res(
                ctx.status(201, "Mocked status"),
                ctx.json(limitedSensorsWithLimitedRecords)
              )
            : res(ctx.status(201, "Mocked status"), ctx.json(limitedSensors));
        } else {
          return res(ctx.status(201, "Mocked status"), ctx.json(sensors));
        }
      }

      return res(ctx.status(201, "Mocked status"), ctx.json(sensors));
    }
  ),
  /* rest.patch<DevicesType>(createApiUrl("/devices"), (req, res, ctx) => {
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
  }), */
  /* rest.delete(createApiUrl("/devices"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const id = Number(query.get("id")?.slice(3));
    const userId = query.get("userId")?.slice(3);
    const device = getDevice(id);
    if (userId == authToken.currentSession.user.id)
      return res(ctx.status(201, "Mocked status"), ctx.json(device));
    else return res(ctx.status(404, "Not found"));
  }), */
  //Projects add update delete
  /* rest.post<ProjectsType[]>(createApiUrl("/projects"), (req, res, ctx) => {
    const payload = req.body[0];
    const createdAt = new Date().toISOString();
    return res(
      ctx.status(201, "Mocked status"),
      ctx.json([{ ...payload, createdAt, id: 5 }])
    );
  }), */
  /* rest.patch<ProjectsType>(createApiUrl("/projects"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const id = Number(query.get("id")?.slice(3));
    const userId = query.get("userId")?.slice(3);
    const project = getUserProject(id);
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
  }), */
  /* rest.delete(createApiUrl("/projects"), (req, res, ctx) => {
    const query = req.url.searchParams;

    const id = Number(query.get("id")?.slice(3));
    const userId = query.get("userId")?.slice(3);
    const project = getUserProject(id);
    if (userId == authToken.currentSession.user.id)
      return res(ctx.status(201, "Mocked status"), ctx.json(project));
    else return res(ctx.status(404, "Not found"));
  }), */
  //Auth
  rest.post(
    "https://dyxublythmmlsositxtg.supabase.co/auth/v1/token",
    (_req, res, ctx) => {
      return res(ctx.status(201, "Mocked status"), ctx.json(refreshToken));
    }
  ),
  //User
  rest.post(createApiUrl("/rpc/delete_user"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"));
  }),
  rest.patch<definitions["user_profiles"]>(
    createApiUrl("/user_profiles"),
    (req, res, ctx) => {
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
              created_at: createdAt,
              role: "maker",
            },
          ])
        );
      else return res(ctx.status(404, "Not found"));
    }
  ),
  //other
  rest.delete(createApiUrl("/authtokens"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json([]));
  }),
  // Head calls
  rest.head(createApiUrl("/user_profiles"), (req, res, ctx) => {
    if (req.headers.get("prefer") === "count=exact") {
      return res(
        ctx.set(
          "content-range",
          `0-${userprofiles.length - 1}/${userprofiles.length}`
        ),
        ctx.status(201, "Mocked status")
      );
    }
    return res(ctx.status(404, "Not found"));
  }),
  rest.head(createApiUrl("/sensors"), (req, res, ctx) => {
    if (req.headers.get("prefer") === "count=exact") {
      return res(
        ctx.set(
          "content-range",
          `0-${parsedSensors.length - 1}/${parsedSensors.length}`
        ),
        ctx.status(201, "Mocked status")
      );
    }
    return res(ctx.status(404, "Not found"));
  }),
  rest.head(createApiUrl("/records"), (req, res, ctx) => {
    if (req.headers.get("prefer") === "count=exact") {
      return res(
        ctx.set("content-range", "0-999/10030"),
        ctx.status(201, "Mocked status")
      );
    }
    return res(ctx.status(404, "Not found"));
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
  ...githubHandlers,
  ...mapBoxGeocodingHandlers,
  ...supabaseHandlers,
  ...authHandlers,
  ...tokenApiHandlers,
];
