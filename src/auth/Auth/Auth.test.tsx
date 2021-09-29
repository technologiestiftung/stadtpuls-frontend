import { supabase } from "@auth/supabase";
import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { FC } from "react";
import { SWRConfig } from "swr";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { AuthProvider, useAuth } from ".";
import { createSigningApiUrl } from "@lib/requests/createSigningApiUrl";

const HookWrapper: FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <AuthProvider>{children}</AuthProvider>
  </SWRConfig>
);

const supabaseSignOut = jest.fn().mockReturnValue({
  user: {
    id: "test-user-id",
    app_metadata: {},
    user_metadata: {},
    aud: "test-aud",
  },
  access_token: "test-token",
});

describe("useAuth", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    supabase.auth.session = supabaseSignOut;
  });
  it("should have default values when logged out", async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    supabase.auth.session = jest.fn().mockReturnValue({});
    const { result } = renderHook(() => useAuth(), { wrapper: HookWrapper });

    await waitFor(() => {
      expect(result.current.authenticatedUser).toBe(null);
      expect(result.current.accessToken).toBe(null);
      expect(result.current.isAuthenticating).toBe(false);
      expect(result.current.isLoadingAuth).toBe(false);
      expect(result.current.magicLinkWasSent).toBe(false);
      expect(result.current.error).toBe(null);
      expect(typeof result.current.signIn).toBe("function");
      expect(typeof result.current.signUp).toBe("function");
    });
  });
  it("should retrieve the user and token from the session", async (): Promise<void> => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    await waitFor(() => {
      const current = result.current;
      expect(current.authenticatedUser?.id).toBe("test-user-id");
      expect(current.accessToken).toBe("test-token");
    });
  });
  it("should call supabase signout when calling signout", async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    supabase.auth.signOut = jest.fn();
    const { result } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    void result.current.signOut();

    await waitFor(() => {
      expect(supabaseSignOut).toHaveBeenCalled();
    });
  });
  it("should signin with happy path", async (): Promise<void> => {
    const server = setupServer(
      rest.post(createSigningApiUrl("signin"), (_req, res, ctx) => {
        return res(
          ctx.status(204, "Mocked status"),
          ctx.text(
            JSON.stringify({
              statusCode: 204,
            })
          )
        );
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    act(() => {
      void result.current.signIn({ email: "test@example.com" });
    });

    await waitForNextUpdate();

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false);
      expect(result.current.magicLinkWasSent).toBe(true);
      expect(result.current.error).toBe(null);
    });

    server.resetHandlers();
    server.close();
  });
  it("should signin with 404 error", async (): Promise<void> => {
    const server = setupServer(
      rest.post(createSigningApiUrl("signin"), (_req, res, ctx) => {
        return res(
          ctx.status(404, "Mocked status"),
          ctx.text(
            JSON.stringify({
              statusCode: 404,
              error: "Not found",
              message: "Not found",
            })
          )
        );
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    act(() => {
      void result.current.signIn({ email: "test@example.com" });
    });

    await waitForNextUpdate();

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false);
      expect(result.current.magicLinkWasSent).toBe(false);
      expect(result.current.error).toBe("Not found");
    });

    server.resetHandlers();
    server.close();
  });
  it("should signin with generic error name", async (): Promise<void> => {
    const server = setupServer(
      rest.post(createSigningApiUrl("signin"), (_req, res, ctx) => {
        return res(
          ctx.status(500, "Mocked status"),
          ctx.text(
            JSON.stringify({
              statusCode: 500,
              error: "",
              message: "",
            })
          )
        );
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    act(() => {
      void result.current.signIn({ email: "test@example.com" });
    });

    await waitForNextUpdate();

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false);
      expect(result.current.magicLinkWasSent).toBe(false);
      expect(result.current.error).toBe(
        "Es ist ein Fehler bei der Anmeldung aufgetreten"
      );
    });

    server.resetHandlers();
    server.close();
  });
  it("should signup with happy path", async (): Promise<void> => {
    const server = setupServer(
      rest.post(createSigningApiUrl("signup"), (_req, res, ctx) => {
        return res(
          ctx.status(204, "Mocked status"),
          ctx.text(
            JSON.stringify({
              statusCode: 204,
            })
          )
        );
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    act(() => {
      void result.current.signUp({
        username: "test",
        email: "test@example.com",
      });
    });

    await waitForNextUpdate();

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false);
      expect(result.current.magicLinkWasSent).toBe(true);
      expect(result.current.error).toBe(null);
    });

    server.resetHandlers();
    server.close();
  });
  it("should signup with 404 error", async (): Promise<void> => {
    const server = setupServer(
      rest.post(createSigningApiUrl("signup"), (_req, res, ctx) => {
        return res(
          ctx.status(404, "Mocked status"),
          ctx.text(
            JSON.stringify({
              statusCode: 404,
              error: "Not found",
              message: "Not found",
            })
          )
        );
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    act(() => {
      void result.current.signUp({
        username: "test",
        email: "test@example.com",
      });
    });

    await waitForNextUpdate();

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false);
      expect(result.current.magicLinkWasSent).toBe(false);
      expect(result.current.error).toBe("Not found");
    });

    server.resetHandlers();
    server.close();
  });
  it("should signup with generic error name", async (): Promise<void> => {
    const server = setupServer(
      rest.post(createSigningApiUrl("signup"), (_req, res, ctx) => {
        return res(
          ctx.status(500, "Mocked status"),
          ctx.text(
            JSON.stringify({
              statusCode: 500,
              error: "",
              message: "",
            })
          )
        );
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: HookWrapper,
    });

    act(() => {
      void result.current.signUp({
        username: "test",
        email: "test@example.com",
      });
    });

    await waitForNextUpdate();

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false);
      expect(result.current.magicLinkWasSent).toBe(false);
      expect(result.current.error).toBe(
        "Es ist ein Fehler bei der Anmeldung aufgetreten"
      );
    });

    server.resetHandlers();
    server.close();
  });
});
