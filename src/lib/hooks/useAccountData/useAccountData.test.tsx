import { createSupabaseUrl } from "@lib/requests/createSupabaseUrl";
import { extendedUserProfiles } from "@mocks/supabaseData/accounts";
import { sensors } from "@mocks/supabaseData/sensors";
import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useAccountData } from ".";

describe("useAccountData hook", () => {
  test("should return the requested account", async (): Promise<void> => {
    const server = setupServer(
      rest.get(
        createSupabaseUrl("/extended_user_profiles"),
        (_req, res, ctx) => {
          return res(
            ctx.status(200, "Mocked status"),
            ctx.json(extendedUserProfiles[0])
          );
        }
      ),
      rest.get(createSupabaseUrl("/sensors"), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(sensors));
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() =>
      useAccountData({ username: extendedUserProfiles[0].username })
    );

    expect(result.current.account).toBeNull();

    await waitForNextUpdate();

    expect(result.current.account).toMatchObject({
      username: extendedUserProfiles[0].username,
    });
    server.resetHandlers();
    server.close();
  });
});
