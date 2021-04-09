import { device1Records } from "../../../mocks/data";
import { createApiUrl } from "../createApiUrl";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getRecordsByDeviceId } from ".";
describe("utility function getRecordsByDeviceId", () => {
  it("should return an array", async (): Promise<void> => {
    const projects = await getRecordsByDeviceId(1);
    expect(Array.isArray(projects)).toBe(true);
  });
  it("should have length of mocked data", async (): Promise<void> => {
    const projects = await getRecordsByDeviceId(1);
    expect(projects).toHaveLength(device1Records.data.records.length);
  });
  it("should return mocked data", async (): Promise<void> => {
    const projects = await getRecordsByDeviceId(1);
    expect(projects[0].id).toBe(device1Records.data.records[0].id);
  });
  it("should throw 'Failed to fetch records' if fails", async (): Promise<void> => {
    const id = 1;
    const server = setupServer(
      rest.get(createApiUrl(`/devices/${id}/records`), (_req, res, ctx) => {
        return res(ctx.status(403), ctx.text("Error message!"));
      })
    );
    server.listen();
    await expect(getRecordsByDeviceId(id)).rejects.toThrow(
      "Failed to fetch records"
    );

    server.resetHandlers();
    server.close();
  });
  it("should throw 'Failed to fetch records' if provided with unexisting id", async (): Promise<void> => {
    const id = 1000000000;
    const server = setupServer(
      rest.get(createApiUrl(`/devices/${id}/records`), (_req, res, ctx) => {
        return res(ctx.status(403), ctx.text("Error message!"));
      })
    );
    server.listen();
    await expect(getRecordsByDeviceId(id)).rejects.toThrow(
      "Failed to fetch records"
    );

    server.resetHandlers();
    server.close();
  });
});
