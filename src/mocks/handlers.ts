import { rest } from "msw";
import { fakeAuthToken } from "./supabaseData/userData";
import { parsedSensors, sensors } from "./supabaseData/sensors";
import { extendedUserProfiles, userProfiles } from "./supabaseData/accounts";
import { createSupabaseUrl } from "../lib/requests/createSupabaseUrl";
import { getSupabaseCredentials } from "../auth/supabase";
import { createApiUrl } from "@lib/requests/createApiUrl";
import { definitions } from "@common/types/supabase";
import { fakeGeocondingData } from "./mapboxData";
import { fakeGithubUserData } from "./githubData";
import { SensorQueryResponseType } from "@lib/hooks/usePublicSensors";
import {
  AccountQueryResponseType,
  accountQueryString,
} from "@lib/hooks/usePublicAccounts";
import { categories } from "./supabaseData/categories";
import { userprofiles } from "./supabaseData/userprofiles";
import { getSensorRecords } from "./supabaseData/records";
import { sensorQueryString } from "@lib/requests/getPublicSensors";

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

const signingHandlers = [
  rest.post(createApiUrl("/signin"), (_req, res, ctx) => {
    return res(
      ctx.status(204, "Mocked status"),
      ctx.text(
        JSON.stringify({
          statusCode: 204,
        })
      )
    );
  }),
  rest.post(createApiUrl("/signup"), (_req, res, ctx) => {
    return res(
      ctx.status(204, "Mocked status"),
      ctx.text(
        JSON.stringify({
          statusCode: 204,
        })
      )
    );
  }),
];

const supabaseHandlers = [
  rest.get(createSupabaseUrl("/categories"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json(categories));
  }),
  rest.get(createSupabaseUrl("/records"), (req, res, ctx) => {
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
  // Sensors add update delete
  rest.post<definitions["sensors"][]>(
    createSupabaseUrl("/sensors"),
    (req, res, ctx) => {
      const payload = req.body[0];

      return res(
        ctx.status(201, "Mocked status"),
        ctx.json([{ ...payload, id: 12 }])
      );
    }
  ),
  rest.get<AccountQueryResponseType>(
    createSupabaseUrl("/user_profiles"),
    (req, res, ctx) => {
      const query = req.url.searchParams;

      const select = query.get("select");
      const username = query
        .get("name")
        ?.replace("eq.", "")
        .replace("ilike.", "")
        .replace("%", "")
        .replace("%", "");
      const limit = query.get("limit");

      // Regex removes whitespaces and line breaks. Necessary because accountQueryString is constructed as template literal
      const trimmedAccountSelectString = accountQueryString.replace(
        /(\r\n|\n|\r| )/gm,
        ""
      );

      const specificAccountDataRequested =
        select === trimmedAccountSelectString;
      const oneAccountRequestedByName =
        specificAccountDataRequested && username;
      const limitedAccountsRequested = specificAccountDataRequested && limit;

      if (specificAccountDataRequested) {
        if (oneAccountRequestedByName && username) {
          return res(
            ctx.status(201, "Mocked status"),
            ctx.json(
              userProfiles.find(
                account =>
                  String(account.name).trim() === String(username).trim()
              )
            )
          );
        }
        if (limitedAccountsRequested && limit) {
          const limitedAccounts = userProfiles.slice(0, parseInt(limit, 10));
          return res(
            ctx.status(201, "Mocked status"),
            ctx.json(limitedAccounts)
          );
        } else {
          return res(ctx.status(201, "Mocked status"), ctx.json(userProfiles));
        }
      }

      return res(ctx.status(201, "Mocked status"), ctx.json(userProfiles));
    }
  ),
  rest.get<definitions["extended_user_profiles"]>(
    createSupabaseUrl("/extended_user_profiles"),
    (_req, res, ctx) => {
      return res(
        ctx.status(200, "Mocked status"),
        ctx.json(extendedUserProfiles)
      );
    }
  ),
  rest.get<SensorQueryResponseType>(
    createSupabaseUrl("/sensors"),
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
  //User
  rest.post(createSupabaseUrl("/rpc/delete_user"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"));
  }),
  rest.patch<definitions["user_profiles"]>(
    createSupabaseUrl("/user_profiles"),
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const payload = req.body;

      const id = query.get("id")?.slice(3);
      const createdAt = new Date().toISOString();
      if (id == fakeAuthToken.currentSession.user.id)
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
  rest.delete(createSupabaseUrl("/authtokens"), (_req, res, ctx) => {
    return res(ctx.status(201, "Mocked status"), ctx.json([]));
  }),
  // Head calls
  rest.head(createSupabaseUrl("/user_profiles"), (req, res, ctx) => {
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
  rest.head(createSupabaseUrl("/sensors"), (req, res, ctx) => {
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
  rest.head(createSupabaseUrl("/records"), (req, res, ctx) => {
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
  ...signingHandlers,
];
