import { rest } from "msw";
import { setupServer } from "msw/node";
import { getDeviceLastRecordDate } from ".";
import { createApiUrl } from "../createApiUrl";
import { fakeDeviceWithFewRecords as fakeDevice } from "@mocks/supabaseData/publicProjects";

describe("utility function getDeviceLastRecordDate", () => {
  it("should return the date of last record belonging to provided deviceId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json([fakeDevice.records[0]])
        );
      })
    );
    server.listen();
    const lasRecordDate = await getDeviceLastRecordDate(fakeDevice.id);

    expect(lasRecordDate).toBe(fakeDevice.records[0].recordedAt);
    server.resetHandlers();
    server.close();
  });
});
