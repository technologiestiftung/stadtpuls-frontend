import { publicAccounts } from "@mocks/supabaseData/accounts";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getUserNames } from ".";
import { createSupabaseUrl } from "../createSupabaseUrl";

describe("utility function getUserNames", () => {
  it("should return all usernames", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/user_profiles`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(publicAccounts));
      })
    );
    server.listen();
    const returnedUsernames = await getUserNames();
    const expectedUsernames = publicAccounts.map(account => account.name);

    expect(Array.isArray(returnedUsernames)).toBe(true);
    expect(returnedUsernames).toStrictEqual(expectedUsernames);
    server.resetHandlers();
    server.close();
  });
});
