import { rest } from "msw";
import { setupServer } from "msw/node";
import { getRecordsCountBySensorId } from ".";
import { createSupabaseUrl } from "../createSupabaseUrl";
import { sensors } from "@mocks/supabaseData/sensors";

const exampleSensor = sensors[0];

describe("utility function getRecordsCountBySensorId", () => {
  it("should return count for records belonging to provided sensorId", async (): Promise<void> => {
    const server = setupServer(
      rest.head(createSupabaseUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.set("content-range", "0-28/29"),
          ctx.status(201, "Mocked status")
        );
      })
    );
    server.listen();
    const count = await getRecordsCountBySensorId(exampleSensor.id);

    expect(count).toBe(29);
    server.resetHandlers();
    server.close();
  });
});
