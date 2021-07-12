import { fakeDeviceWithRecords } from "@mocks/supabaseData/publicProjects";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getRecordsByDeviceId } from ".";
import { createV2ApiUrl } from "../createV2ApiUrl";

describe("utility function getRecordsByDeviceId", () => {
  it("should return an array of records", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createV2ApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(fakeDeviceWithRecords.records)
        );
      })
    );
    server.listen();
    const records = await getRecordsByDeviceId(fakeDeviceWithRecords.id);

    expect.assertions(2);
    expect(Array.isArray(records)).toBe(true);
    expect(records).toHaveLength(fakeDeviceWithRecords.records.length);
    server.resetHandlers();
    server.close();
  });

  it("should send error message when erroring", async (): Promise<void> => {
    const id = 99999999;

    const server = setupServer(
      rest.get(createV2ApiUrl(`/records`), (_req, res, ctx) => {
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
