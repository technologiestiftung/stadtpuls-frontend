import { renderHook } from "@testing-library/react-hooks";
import * as auth from "@auth/Auth";
import { useUserTokens } from ".";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createApiUrl } from "@lib/requests/createApiUrl";
import { SWRConfig } from "swr";
import { FC } from "react";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";

describe("useUserTokens hook", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({
      accessToken: "12345",
      authenticatedUser: {
        id: "ingo",
      },
    });
  });
  it("returns the correct fields", async () => {
    const wrapper: FC = ({ children }) => (
      <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
    );

    const { result, waitForNextUpdate } = renderHook(() => useUserTokens(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(typeof result.current.tokens).toBe("object");
    expect(typeof result.current.error).toBe("object");
    expect(typeof result.current.createToken).toBe("function");
    expect(typeof result.current.deleteToken).toBe("function");
    expect(typeof result.current.regenerateToken).toBe("function");
  });
  it("returns the user's tokens", async () => {
    const allTokens: definitions["auth_tokens"][] = [
      {
        id: "some-hash",
        nice_id: 1,
        description: "Lorem ipsum dolor.",
        scope: "sudo",
        user_id: "ingo",
        salt: "",
      },
      {
        id: "some-hash",
        nice_id: 2,
        description: "Sit amet consectetur.",
        scope: "sudo",
        user_id: "fabian",
        salt: "",
      },
      {
        id: "some-hash",
        nice_id: 3,
        description: "Lipsum amet dolor.",
        scope: "sudo",
        user_id: "lucas",
        salt: "",
      },
    ];
    const ingosTokens = allTokens.filter(token => token.user_id === "ingo");

    const server = setupServer(
      rest.get(createApiUrl("/authtokens"), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json({
            data: ingosTokens,
          })
        );
      })
    );
    server.listen();

    const wrapper: FC = ({ children }) => (
      <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
    );

    const { result, waitForNextUpdate } = renderHook(() => useUserTokens(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.tokens).toMatchObject(ingosTokens);

    server.resetHandlers();
    server.close();
  });
});
