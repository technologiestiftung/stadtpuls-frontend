import { usePublicAccounts } from ".";
import { renderHook } from "@testing-library/react-hooks";
import {
  extendedUserProfiles,
  parsedAccounts,
} from "@mocks/supabaseData/accounts";
import { AuthProvider } from "@auth/Auth";
import { SWRConfig } from "swr";
import { FC } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { waitFor } from "@testing-library/react";

const HookWrapper: FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <AuthProvider>{children}</AuthProvider>
  </SWRConfig>
);

describe("hook usePublicAccounts", () => {
  it("returns the correct fields", async () => {
    const server = setupServer(
      rest.get("*", (_req, res, ctx) =>
        res(ctx.status(200, "Mocked status"), ctx.json(extendedUserProfiles))
      )
    );
    server.listen();

    const { result, waitForNextUpdate } = renderHook(
      () => usePublicAccounts(),
      {
        wrapper: HookWrapper,
      }
    );

    await waitForNextUpdate();

    expect(Array.isArray(result.current.accounts)).toBe(true);

    server.close();
    server.resetHandlers();
  });
  it("returns the public accounts", async () => {
    const server = setupServer(
      rest.get("*", (_req, res, ctx) =>
        res(
          ctx.set("Content-Range", "0-3/3"),
          ctx.status(200, "Mocked status"),
          ctx.json(extendedUserProfiles.slice(0, 3))
        )
      )
    );
    server.listen();

    const { result, waitForNextUpdate } = renderHook(
      () =>
        usePublicAccounts({
          rangeStart: undefined,
          rangeEnd: undefined,
          initialData: {
            accounts: parsedAccounts,
            count: parsedAccounts.length,
          },
        }),
      {
        wrapper: HookWrapper,
      }
    );

    await waitForNextUpdate();

    await waitFor(() => {
      expect(result.current.accounts).toStrictEqual(parsedAccounts.slice(0, 3));
    });

    server.close();
    server.resetHandlers();
  });
});
