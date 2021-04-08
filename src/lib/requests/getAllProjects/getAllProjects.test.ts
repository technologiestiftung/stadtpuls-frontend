import { createApiUrl } from "./../createApiUrl";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { projectsResponse } from "./../../../mocks/data";
import { getAllProjects } from ".";
describe("utility function getAllProjects", () => {
  it("should return an array", async (): Promise<void> => {
    const projects = await getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
  });
  it("should have length of mocked data", async (): Promise<void> => {
    const projects = await getAllProjects();
    expect(projects).toHaveLength(projectsResponse.data.projects.length);
  });
  it("should return mocked data", async (): Promise<void> => {
    const projects = await getAllProjects();
    expect(projects[0].id).toBe(projectsResponse.data.projects[0].id);
  });
  it("should throw 'Failed to fetch projects' if fails", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl("/projects"), (_req, res, ctx) => {
        return res(ctx.status(403), ctx.text("Error message!"));
      })
    );
    server.listen();
    await expect(getAllProjects()).rejects.toThrow("Failed to fetch projects");

    server.resetHandlers();
    server.close();
  });
});
