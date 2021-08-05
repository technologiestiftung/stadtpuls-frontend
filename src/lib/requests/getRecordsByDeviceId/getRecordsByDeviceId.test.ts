import { rest } from "msw";
import { setupServer } from "msw/node";
import { getRecordsByDeviceId } from ".";
import { createApiUrl } from "../createApiUrl";

const fakeDevice = {
  id: 1234,
  externalId: "device1",
  projectId: 1234,
  records: [
    {
      id: 1,
      deviceId: 1234,
      recordedAt: "2020-12-01T08:00:00",
      measurements: [28.5],
    },
    {
      id: 2,
      deviceId: 1234,
      recordedAt: "2020-12-02T15:00:00",
      measurements: [24.1],
    },
    {
      id: 3,
      deviceId: 1234,
      recordedAt: "2020-12-03T22:00:00",
      measurements: [20.9],
    },
  ],
};

describe("utility function getRecordsByDeviceId", () => {
  it("should return records belonging to provided deviceId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(fakeDevice.records)
        );
      })
    );
    server.listen();
    const records = await getRecordsByDeviceId(fakeDevice.id);

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    const allRecordsBelongToProvidedDevice = records.every(record => {
      return record.deviceId === fakeDevice.id;
    });
    expect(allRecordsBelongToProvidedDevice).toBe(true);
    server.resetHandlers();
    server.close();
  });

  it("should only return records within provided time range", async (): Promise<void> => {
    const testStartDate = fakeDevice.records[0].recordedAt;
    const testEndDate = fakeDevice.records[1].recordedAt;

    const server = setupServer(
      rest.get(createApiUrl(`/records`), (req, res, ctx) => {
        const query = req.url.searchParams;

        const [gte, lte] = query.getAll("recordedAt");
        const gteValue = gte.replace("gte.", "");
        const lteValue = lte.replace("lte.", "");

        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(
            fakeDevice.records.filter(
              record =>
                record.recordedAt >= gteValue && record.recordedAt <= lteValue
            )
          )
        );
      })
    );
    server.listen();

    const records = await getRecordsByDeviceId(fakeDevice.id, {
      startDate: testStartDate,
      endDate: testEndDate,
    });

    const returnedTimestamps = records.map(record => record.recordedAt);
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
    const testStartDate = fakeDevice.records[1].recordedAt;

    const server = setupServer(
      rest.get(createApiUrl(`/records`), (req, res, ctx) => {
        const query = req.url.searchParams;

        const [gte] = query.getAll("recordedAt");
        const gteValue = gte.replace("gte.", "");

        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(
            fakeDevice.records.filter(record => record.recordedAt >= gteValue)
          )
        );
      })
    );
    server.listen();

    const records = await getRecordsByDeviceId(fakeDevice.id, {
      startDate: testStartDate,
    });

    const returnedTimestamps = records.map(record => record.recordedAt);
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
    const testEndDate = fakeDevice.records[1].recordedAt;

    const server = setupServer(
      rest.get(createApiUrl(`/records`), (req, res, ctx) => {
        const query = req.url.searchParams;

        const [lte] = query.getAll("recordedAt");
        const lteValue = lte.replace("lte.", "");

        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(
            fakeDevice.records.filter(record => record.recordedAt <= lteValue)
          )
        );
      })
    );
    server.listen();

    const records = await getRecordsByDeviceId(fakeDevice.id, {
      endDate: testEndDate,
    });

    const returnedTimestamps = records.map(record => record.recordedAt);
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
          ctx.json(fakeDevice.records)
        );
      })
    );
    server.listen();

    const records = await getRecordsByDeviceId(fakeDevice.id, {});

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    expect(records).toMatchObject(fakeDevice.records);

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
      await getRecordsByDeviceId(id);
    } catch (error) {
      expect(error).toEqual({
        message: "Error message",
      });
    }

    server.resetHandlers();
    server.close();
  });
});
