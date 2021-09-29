import { renderHook } from "@testing-library/react-hooks";
import * as auth from "@auth/Auth";
import { useUserTokens } from ".";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createTokenApiUrl } from "@lib/requests/createTokenApiUrl";
import { SWRConfig } from "swr";
import { FC } from "react";

describe("useUserTokens hook", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({
      accessToken: "12345",
      authenticatedUser: {
        id: 1234,
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

    expect(result.current.tokens).toHaveLength(3);

    expect(typeof result.current.tokens).toBe("object");
    expect(typeof result.current.error).toBe("object");
    expect(typeof result.current.createToken).toBe("function");
    expect(typeof result.current.deleteToken).toBe("function");
    expect(typeof result.current.regenerateToken).toBe("function");
  });
  it("should return null without accessToken", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({
      accessToken: undefined,
      authenticatedUser: undefined,
    });
    const wrapper: FC = ({ children }) => (
      <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
    );

    const { result, waitForNextUpdate } = renderHook(() => useUserTokens(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.tokens).toBeNull();
  });
  it("should return an error if TODO: ....", async () => {
    const server = setupServer(
      rest.get(createTokenApiUrl(), (_req, res, ctx) => {
        return res(ctx.status(404, "Mocked status"), ctx.text("Not found"));
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

    expect(result.current.error?.message).toBe("Not found");

    server.resetHandlers();
    server.close();
  });
  it("should return an error if 201", async () => {
    const server = setupServer(
      rest.get(createTokenApiUrl(), (_req, res, ctx) => {
        return res(ctx.status(201, "Mocked status"), ctx.json({}));
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

    expect(result.current.error?.message).toBe(
      "Wrong status code 201 for successful tokens response"
    );

    server.resetHandlers();
    server.close();
  });
});
