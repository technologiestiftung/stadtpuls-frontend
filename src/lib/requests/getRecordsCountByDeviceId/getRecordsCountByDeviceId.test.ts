import { rest } from "msw";
import { setupServer } from "msw/node";
import { getRecordsCountByDeviceId } from ".";
import { createApiUrl } from "../createApiUrl";
import { fakeDeviceWithFewRecords as fakeDevice } from "@mocks/supabaseData/publicProjects";

describe("utility function getRecordsCountByDeviceId", () => {
  it("should return count for records belonging to provided deviceId", async (): Promise<void> => {
    const server = setupServer(
      rest.head(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.set("content-range", "0-28/29"),
          ctx.status(201, "Mocked status")
        );
      })
    );
    server.listen();
    const count = await getRecordsCountByDeviceId(fakeDevice.id);

    expect(count).toBe(29);
    server.resetHandlers();
    server.close();
  });
});
