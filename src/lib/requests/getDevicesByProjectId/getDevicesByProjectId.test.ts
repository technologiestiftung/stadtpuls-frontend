import { project1Devices } from "./../../../mocks/data";
import { createApiUrl } from "../createApiUrl";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getDevicesByProjectId } from ".";
describe("utility function getDevicesByProjectId", () => {
  it("should return an array", async (): Promise<void> => {
    const projects = await getDevicesByProjectId(1);
    expect(Array.isArray(projects)).toBe(true);
  });
  it("should have length of mocked data", async (): Promise<void> => {
    const projects = await getDevicesByProjectId(1);
    expect(projects).toHaveLength(project1Devices.data.devices.length);
  });
  it("should return mocked data", async (): Promise<void> => {
    const projects = await getDevicesByProjectId(1);
    expect(projects[0].id).toBe(project1Devices.data.devices[0].id);
  });
  it("should throw 'Failed to fetch projects' if fails", async (): Promise<void> => {
    const id = 1;
    const server = setupServer(
      rest.get(createApiUrl(`/projects/${id}/devices`), (_req, res, ctx) => {
        return res(ctx.status(403), ctx.text("Error message!"));
      })
    );
    server.listen();
    await expect(getDevicesByProjectId(id)).rejects.toThrow(
      "Failed to fetch device"
    );

    server.resetHandlers();
    server.close();
  });
  it("should throw 'Failed to fetch projects' if provided with unexisting id", async (): Promise<void> => {
    const id = 1000000000;
    const server = setupServer(
      rest.get(createApiUrl(`/projects/${id}/devices`), (_req, res, ctx) => {
        return res(ctx.status(403), ctx.text("Error message!"));
      })
    );
    server.listen();
    await expect(getDevicesByProjectId(id)).rejects.toThrow(
      "Failed to fetch device"
    );

    server.resetHandlers();
    server.close();
  });
});
