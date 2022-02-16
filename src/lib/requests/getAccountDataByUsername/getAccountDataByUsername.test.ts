import { extendedUserProfiles } from "@mocks/supabaseData/accounts";
import { sensors } from "@mocks/supabaseData/sensors";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAccountDataByUsername } from ".";
import { createSupabaseUrl } from "../createSupabaseUrl";

const exampleAccount = extendedUserProfiles[0];

describe("utility function getAccountDataByUsername", () => {
  it("should return data belonging to provided username", async (): Promise<void> => {
    const server = setupServer(
      rest.get(
        createSupabaseUrl(`/extended_user_profiles`),
        (_req, res, ctx) => {
          return res(
            ctx.status(200, "Mocked status"),
            ctx.json(exampleAccount)
          );
        }
      ),
      rest.get(createSupabaseUrl(`/sensors`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(sensors));
      })
    );
    server.listen();
    const accountData = await getAccountDataByUsername(
      exampleAccount.username as string
    );

    expect(Array.isArray(accountData)).toBe(false);
    expect(accountData?.id).toBe(exampleAccount.id);
    expect(accountData?.username).toBe(exampleAccount.username);
    expect(accountData?.displayName).toBe(exampleAccount.display_name);
    server.resetHandlers();
    server.close();
  });
});
