import { FC } from "react";
import { rest } from "msw";
import { useSensorCategories } from ".";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import { categories } from "@mocks/supabaseData/categories";
import { renderHook } from "@testing-library/react-hooks";
import { AuthProvider } from "@auth/Auth";

const HookWrapper: FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <AuthProvider>{children}</AuthProvider>
  </SWRConfig>
);

describe("useSensorCategories", () => {
  it("should get the sensor categories", async (): Promise<void> => {
    const server = setupServer(
      rest.get("*", (_req, res, ctx) =>
        res(ctx.status(200, "Mocked status"), ctx.json(categories))
      )
    );
    server.listen();

    const { result, waitForNextUpdate } = renderHook(
      () => useSensorCategories(),
      {
        wrapper: HookWrapper,
      }
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.categories).toStrictEqual(categories);

    server.close();
    server.resetHandlers();
  });

  it("should return an error if network has error", async (): Promise<void> => {
    const testError = "Mammamamamma";
    const server = setupServer(
      rest.get("*", (_req, res) => res.networkError(testError))
    );
    server.listen();

    const { result, waitForNextUpdate } = renderHook(
      () => useSensorCategories(),
      {
        wrapper: HookWrapper,
      }
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeNull();

    server.close();
    server.resetHandlers();
  });
});
