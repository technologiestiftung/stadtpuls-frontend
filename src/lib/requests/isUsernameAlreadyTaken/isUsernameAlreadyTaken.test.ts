import { userprofiles } from "@mocks/supabaseData/userprofiles";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { isUsernameAlreadyTaken } from ".";
import { createSupabaseUrl } from "../createSupabaseUrl";

const exampleUser = userprofiles[0];

describe("utility function isUsernameAlreadyTaken", () => {
  it("should return true if username already taken", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/user_profiles`), (_req, res, ctx) => {
        return res(
          ctx.status(201, "Mocked status"),
          ctx.json({
            name: exampleUser.name,
          })
        );
      })
    );
    server.listen();
    const isTaken = await isUsernameAlreadyTaken(exampleUser.name as string);
    expect(isTaken).toBe(true);

    server.resetHandlers();
    server.close();
  });
  it("should return false if username not taken", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/user_profiles`), (_req, res, ctx) => {
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
