import { fakeProjects } from "@mocks/supabaseData/publicProjects";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getProjects } from ".";
import { createV2ApiUrl } from "../createV2ApiUrl";

describe("utility function getProjects", () => {
  it("should return an array of projects", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createV2ApiUrl(`/projects`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(fakeProjects));
      })
    );
    server.listen();
    const projects = await getProjects();

    expect.assertions(2);
    expect(Array.isArray(projects)).toBe(true);
    expect(projects).toHaveLength(fakeProjects.length);
    server.resetHandlers();
    server.close();
  });

  it("should send error message when erroring", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createV2ApiUrl(`/projects`), (_req, res, ctx) => {
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
  });
});
