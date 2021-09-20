import { sensors } from "@mocks/supabaseData/sensors";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getSensorData } from ".";
import { createApiUrl } from "../createApiUrl";

const exampleSensor = sensors[0];

describe("utility function getSensorData", () => {
  it("should return a sensor according to the provided ID", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/sensors`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(exampleSensor));
      })
    );
    server.listen();
    const returnedSensor = await getSensorData(exampleSensor.id);

    expect.assertions(1);
    expect(returnedSensor).toMatchObject(exampleSensor);
    server.resetHandlers();
    server.close();
  });

  it("should return an error message when no sensor found", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/sensors`), (_req, res, ctx) => {
        return res(
          ctx.status(404, "Mocked status"),
          ctx.json({ message: "Error message" })
        );
      })
    );
    server.listen();

    expect.assertions(1);
    try {
      await getSensorData(999999);
    } catch (error) {
      expect(error).toEqual({
        message: "Error message",
      });
    }
    server.resetHandlers();
    server.close();
  });

  /* it.skip("should send error message when erroring", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/projects`), (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ message: "Error message" }));
      })
    );

    server.listen();

    expect.assertions(1);
    try {
      await getProjects();
    } catch (error) {
      expect(error).toEqual({
        message: "Error message",
      });
    }

    server.resetHandlers();
    server.close();
  }); */
});