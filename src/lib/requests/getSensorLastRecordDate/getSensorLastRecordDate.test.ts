import { rest } from "msw";
import { setupServer } from "msw/node";
import { getSensorLastRecordDate } from ".";
import { createSupabaseUrl } from "../createSupabaseUrl";
import { sensors } from "@mocks/supabaseData/sensors";

const exampleSensor = sensors[0];

describe("utility function getSensorLastRecordDate", () => {
  it("should return the date of last record belonging to provided sensorId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json([exampleSensor.records[0]])
        );
      })
    );
    server.listen();
    const lastRecordDate = await getSensorLastRecordDate(exampleSensor.id);

    expect(lastRecordDate).toBe(exampleSensor.records[0].recorded_at);
    server.resetHandlers();
    server.close();
  });
});
