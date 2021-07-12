import { rest } from "msw";
import { setupServer } from "msw/node";
import { isUsernameAlreadyTaken } from ".";
import { createApiUrl } from "../createApiUrl";
describe("utility function isUsernameAlreadyTaken", () => {
  it("should return true if username already taken", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/users`), (_req, res, ctx) => {
        return res(
          ctx.status(201, "Mocked status"),
          ctx.json({ name: "ingo" })
        );
      })
    );
    server.listen();
    const isTaken = await isUsernameAlreadyTaken("ingo");
    expect(isTaken).toBe(true);

    server.resetHandlers();
    server.close();
  });
  it("should return false if username not taken", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/users`), (_req, res, ctx) => {
        return res(ctx.status(201, "Mocked status"), ctx.json(undefined));
      })
    );
    server.listen();
    const isTaken = await isUsernameAlreadyTaken("ingo");
    expect(isTaken).toBe(false);

    server.resetHandlers();
    server.close();
  });
});
