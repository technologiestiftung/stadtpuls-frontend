import { rest } from "msw";
import { setupServer } from "msw/node";
import { createApiUrl } from "../../../../../lib/requests/createApiUrl";
import { createMocks } from "node-mocks-http";
import recordsHandler from "../../../../../../pages/api/v1/devices/[id]/records";
import { VALID_TIMESTAMP_EXAMPLE } from "@lib/timestampValidator";
import { NextApiRequest, NextApiResponse } from "next";
import { sensors } from "@mocks/supabaseData/sensors";

const fakeDevice = sensors[0];

const REQUEST_BASICS = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_WEB_URL || ""}/api/v1/devices/1/records`,
};

describe("/api/v1/devices/[id]/records", () => {
  it("returns data for valid request", async () => {
    const supabaseServer = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(fakeDevice.records)
        );
      })
    );
    supabaseServer.listen();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      REQUEST_BASICS,
      query: {
        id: "1",
        startDate: "2020-09-08T20:09:12",
        endDate: "2021-09-08T20:09:12",
      },
    });

    await recordsHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toMatchObject({
      data: fakeDevice.records,
    });

    supabaseServer.resetHandlers();
    supabaseServer.close();
  });

  it("returns '400 Bad Request' when more than one id provided in query params", async () => {
    const supabaseServer = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(fakeDevice.records)
        );
      })
    );
    supabaseServer.listen();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      REQUEST_BASICS,
      query: {
        id: ["1", "5"],
      },
    });

    await recordsHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toMatchObject({
      message: "Please provide a valid ID in your request",
    });

    supabaseServer.resetHandlers();
    supabaseServer.close();
  });

  it("returns '400 Bad Request' when more than one startDate provided in query params", async () => {
    const supabaseServer = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(fakeDevice.records)
        );
      })
    );
    supabaseServer.listen();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      REQUEST_BASICS,
      query: {
        id: "1",
        startDate: ["2020-09-08T20:09:12", "2021-09-08T20:09:12"],
      },
    });

    await recordsHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toMatchObject({
      message: "Please provide a valid time range in your request",
    });

    supabaseServer.resetHandlers();
    supabaseServer.close();
  });

  it("returns '400 Bad Request' when invalid timestamp provided", async () => {
    const supabaseServer = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(fakeDevice.records)
        );
      })
    );
    supabaseServer.listen();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      REQUEST_BASICS,
      query: {
        id: "1",
        startDate: "220-09-08T20:09:12",
      },
    });

    await recordsHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toMatchObject({
      message: `startDate and / or endDate are invalid. Please provide valid timestamps such as: ${VALID_TIMESTAMP_EXAMPLE}`,
    });

    supabaseServer.resetHandlers();
    supabaseServer.close();
  });

  it("returns '404 Not Found' when no records are found", async () => {
    const supabaseServer = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json([]));
      })
    );
    supabaseServer.listen();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      REQUEST_BASICS,
      query: {
        id: "1",
      },
    });

    await recordsHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toMatchObject({
      message: `No records found`,
    });

    supabaseServer.resetHandlers();
    supabaseServer.close();
  });

  it("returns '500 Internal Server Error' for unexpected errors", async () => {
    const supabaseServer = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(ctx.status(500, "Mocked status"));
      })
    );
    supabaseServer.listen();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      REQUEST_BASICS,
      query: {
        id: "1",
      },
    });

    await recordsHandler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toMatchObject({
      message: `The request could not be processed`,
    });

    supabaseServer.resetHandlers();
    supabaseServer.close();
  });
});
