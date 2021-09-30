import { createSupabaseUrl } from "@lib/requests/createSupabaseUrl";
import { publicAccounts } from "@mocks/supabaseData/accounts";
import { renderHook } from "@testing-library/react-hooks";
import * as sup from "@auth/supabase";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useUniqueUsernameValidation } from ".";

describe("useUniqueUsernameValidation", () => {
  it("should return default values", () => {
    const { result } = renderHook(() => useUniqueUsernameValidation("test"));
    expect(result.current.isUnique).toEqual(false);
    expect(result.current.isLoading).toEqual(true);
    expect(result.current.error).toEqual(null);
  });
  it("should return true if no users with same name found", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/user_profiles`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json([]));
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() =>
      useUniqueUsernameValidation("testa")
    );

    await waitForNextUpdate();

    expect(result.current.isUnique).toEqual(true);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual(null);

    server.resetHandlers();
    server.close();
  });
  it("should return false if a user with same name was found", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/user_profiles`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json(publicAccounts.slice(0, 1))
        );
      })
    );
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() =>
      useUniqueUsernameValidation("testb")
    );

    await waitForNextUpdate();

    expect(result.current.isUnique).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error).toEqual(null);

    server.resetHandlers();
    server.close();
  });
  it("should return an error if there is a network error", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/user_profiles`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json([]));
      })
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sup.supabase.from = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          data: null,
          error: new Error("Network error"),
        }),
      }),
    });
    server.listen();
    const { result, waitForNextUpdate } = renderHook(() =>
      useUniqueUsernameValidation("testc")
    );

    await waitForNextUpdate();

    expect(result.current.isUnique).toEqual(false);
    expect(result.current.isLoading).toEqual(false);
    expect(result.current.error?.message).toEqual("Network error");

    server.resetHandlers();
    server.close();
  });
});
