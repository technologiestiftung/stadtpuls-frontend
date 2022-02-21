import { FC } from "react";
import { rest } from "msw";
import { useCuratedSensors } from ".";
import { SWRConfig } from "swr";
import { setupServer } from "msw/node";
import { parsedSensors, sensors } from "@mocks/supabaseData/sensors";
import { AuthProvider } from "@auth/Auth";
import { renderHook } from "@testing-library/react-hooks";

const HookWrapper: FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <AuthProvider>{children}</AuthProvider>
  </SWRConfig>
);

describe("hook useCuratedSensors", () => {
  it("should provide a data and error value", async (): Promise<void> => {
    const server = setupServer(
      rest.get("*", (_req, res, ctx) =>
        res(ctx.status(200, "Mocked status"), ctx.json(sensors.slice(0, 3)))
      )
    );
    server.listen();

    const { result, waitForNextUpdate } = renderHook(
      () => useCuratedSensors(),
      {
        wrapper: HookWrapper,
      }
    );

    await waitForNextUpdate();

    expect(result.current.data).toStrictEqual(parsedSensors.slice(0, 3));
    expect(result.current.error).toBeNull();

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
      () => useCuratedSensors(),
      {
        wrapper: HookWrapper,
      }
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.error).not.toBeNull();

    server.close();
    server.resetHandlers();
  });
});
