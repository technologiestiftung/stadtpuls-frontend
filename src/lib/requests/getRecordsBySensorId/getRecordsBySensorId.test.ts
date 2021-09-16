import { rest } from "msw";
import { setupServer } from "msw/node";
import { getRecordsBySensorId } from ".";
import { createApiUrl } from "../createApiUrl";
import { sensors } from "@mocks/supabaseData/sensors";

const exampleSensor = sensors[0];

describe("utility function getRecordsBySensorId", () => {
  it("should return records belonging to provided sensorId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(exampleSensor.records)
        );
      })
    );
    server.listen();
    const records = await getRecordsBySensorId(exampleSensor.id);

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    const allRecordsBelongToProvidedDevice = records.every(record => {
      return record.sensor_id === exampleSensor.id;
    });
    expect(allRecordsBelongToProvidedDevice).toBe(true);
    server.resetHandlers();
    server.close();
  });

  it("should only return records within provided time range", async (): Promise<void> => {
    const testStartDate = exampleSensor.records[0].recorded_at;
    const testEndDate = exampleSensor.records[1].recorded_at;

    const server = setupServer(
      rest.get(createApiUrl(`/records`), (req, res, ctx) => {
        const query = req.url.searchParams;

        const [gte, lte] = query.getAll("recorded_at");
        const gteValue = gte.replace("gte.", "");
        const lteValue = lte.replace("lte.", "");

        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(
            exampleSensor.records.filter(
              record =>
                record.recorded_at >= gteValue && record.recorded_at <= lteValue
            )
          )
        );
      })
    );
    server.listen();

    const records = await getRecordsBySensorId(exampleSensor.id, {
      startDate: testStartDate,
      endDate: testEndDate,
    });

    const returnedTimestamps = records.map(record => record.recorded_at);
    const allTimestampsAreWithinProvidedRange = returnedTimestamps.every(
      timestamp => timestamp >= testStartDate && timestamp <= testEndDate
    );

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    expect(allTimestampsAreWithinProvidedRange).toBe(true);

    server.resetHandlers();
    server.close();
  });

  it("should only return records greater or equal to provided startDate", async (): Promise<void> => {
    const testStartDate = exampleSensor.records[1].recorded_at;

    const server = setupServer(
      rest.get(createApiUrl(`/records`), (req, res, ctx) => {
        const query = req.url.searchParams;

        const [gte] = query.getAll("recorded_at");
        const gteValue = gte.replace("gte.", "");

        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(
            exampleSensor.records.filter(
              record => record.recorded_at >= gteValue
            )
          )
        );
      })
    );
    server.listen();

    const records = await getRecordsBySensorId(exampleSensor.id, {
      startDate: testStartDate,
    });

    const returnedTimestamps = records.map(record => record.recorded_at);
    const allTimestampsAreWithinProvidedRange = returnedTimestamps.every(
      timestamp => timestamp >= testStartDate
    );

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    expect(allTimestampsAreWithinProvidedRange).toBe(true);

    server.resetHandlers();
    server.close();
  });

  it("should only return records less or equal to provided endDate", async (): Promise<void> => {
    const testEndDate = exampleSensor.records[1].recorded_at;

    const server = setupServer(
      rest.get(createApiUrl(`/records`), (req, res, ctx) => {
        const query = req.url.searchParams;

        const [lte] = query.getAll("recorded_at");
        const lteValue = lte.replace("lte.", "");

        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(
            exampleSensor.records.filter(
              record => record.recorded_at <= lteValue
            )
          )
        );
      })
    );
    server.listen();

    const records = await getRecordsBySensorId(exampleSensor.id, {
      endDate: testEndDate,
    });

    const returnedTimestamps = records.map(record => record.recorded_at);
    const allTimestampsAreWithinProvidedRange = returnedTimestamps.every(
      timestamp => timestamp <= testEndDate
    );

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    expect(allTimestampsAreWithinProvidedRange).toBe(true);

    server.resetHandlers();
    server.close();
  });

  it("should return all records when empty options object provided", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(exampleSensor.records)
        );
      })
    );
    server.listen();

    const records = await getRecordsBySensorId(exampleSensor.id, {});

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    expect(records).toMatchObject(exampleSensor.records);

    server.resetHandlers();
    server.close();
  });

  it("should send error message when erroring", async (): Promise<void> => {
    const id = 99999999;

    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ message: "Error message" }));
      })
    );

    server.listen();

    expect.assertions(1);
    try {
      await getRecordsBySensorId(id);
    } catch (error) {
      expect(error).toEqual({
        message: "Error message",
      });
    }

    server.resetHandlers();
    server.close();
  });
});
