import { rest } from "msw";
import { setupServer } from "msw/node";
import { getSensorsRecords } from ".";
import { sensors, parsedSensors } from "@mocks/supabaseData/sensors";
describe("utility function getSensorsRecords", () => {
  it("returns all records from ids provided", async (): Promise<void> => {
    const server = setupServer(
      rest.get("*", (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(sensors));
      })
    );
    server.listen();
    const sensorsRecordsMap = await getSensorsRecords([sensors[0].id]);
    expect(sensorsRecordsMap).toMatchObject({
      [sensors[0].id]: parsedSensors[0].parsedRecords,
    });
    server.resetHandlers();
    server.close();
  });
});
