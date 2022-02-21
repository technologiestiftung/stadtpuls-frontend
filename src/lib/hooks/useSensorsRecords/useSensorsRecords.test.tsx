import { createSupabaseUrl } from "@lib/requests/createSupabaseUrl";
import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useSensorsRecords } from ".";
import { sensors, parsedSensors } from "@mocks/supabaseData/sensors";
import { AuthProvider } from "@auth/Auth";
import { SWRConfig } from "swr";
import { FC } from "react";

const HookWrapper: FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <AuthProvider>{children}</AuthProvider>
  </SWRConfig>
);

describe("useSensorRecords hook", () => {
  test("should return the nothing if empty array provided", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/sensors`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(sensors));
      })
    );
    server.listen();

    const { result, waitForNextUpdate } = renderHook(
      () => useSensorsRecords([]),
      { wrapper: HookWrapper }
    );

    expect(Object.keys(result.current.sensorsRecordsMap)).toHaveLength(0);

    await waitForNextUpdate();

    expect(Object.keys(result.current.sensorsRecordsMap)).toHaveLength(0);
  });
  test("should return the nothing if no ids provided", () => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/sensors`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(sensors));
      })
    );
    server.listen();

    const { result } = renderHook(() => useSensorsRecords(), {
      wrapper: HookWrapper,
    });

    expect(Object.keys(result.current.sensorsRecordsMap)).toHaveLength(0);
  });
  test("should return the requested sensors' records", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createSupabaseUrl(`/sensors`), (_req, res, ctx) => {
        return res(ctx.status(200, "Mocked status"), ctx.json(sensors));
      })
    );
    server.listen();

    const { result, waitForNextUpdate } = renderHook(
      () => useSensorsRecords([sensors[0].id]),
      { wrapper: HookWrapper }
    );

    expect(Object.keys(result.current.sensorsRecordsMap)).toHaveLength(0);

    await waitForNextUpdate();

    expect(result.current.sensorsRecordsMap).toMatchObject({
      [sensors[0].id]: parsedSensors[0].parsedRecords,
    });
  });
});
