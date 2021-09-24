import { publicAccounts } from "@mocks/supabaseData/accounts";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAccountDataByUsername } from ".";
import { createApiUrl } from "../createApiUrl";

const exampleAccount = publicAccounts[0];

describe("utility function getAccountDataByUsername", () => {
  it("should return data belonging to provided username", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/user_profiles`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(exampleAccount));
      })
    );
    server.listen();
    const accountData = await getAccountDataByUsername("bob");

    expect(Array.isArray(accountData)).toBe(false);
    expect(accountData.id).toBe(exampleAccount.id);
    expect(accountData.username).toBe(exampleAccount.name);
    expect(accountData.displayName).toBe(exampleAccount.display_name);
    server.resetHandlers();
    server.close();
  });
});