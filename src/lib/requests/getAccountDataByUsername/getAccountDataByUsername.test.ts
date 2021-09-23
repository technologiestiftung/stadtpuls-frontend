import { definitions } from "@common/types/supabase";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAccountDataByUsername } from ".";
import { createApiUrl } from "../createApiUrl";

const exampleAccount: definitions["user_profiles"] = {
  id: "1",
  name: "bob",
  created_at: new Date().toISOString(),
  display_name: "Bob Der Handwerker",
};

describe("utility function getAccountDataByUsername", () => {
  it("should return data belonging to provided username", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/user_profiles`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json([exampleAccount])
        );
      })
    );
    server.listen();
    const accountData = await getAccountDataByUsername("bob");

    expect(Array.isArray(accountData)).toBe(false);
    expect(accountData.id).toBe(exampleAccount.id);
    expect(accountData.name).toBe(exampleAccount.name);
    expect(accountData.created_at).toBe(exampleAccount.created_at);
    expect(accountData.display_name).toBe(exampleAccount.display_name);
    server.resetHandlers();
    server.close();
  });
});
