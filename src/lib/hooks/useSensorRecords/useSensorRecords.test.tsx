import { AuthProvider, useAuth } from "@auth/Auth";
import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions";
import { render, waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { FC, useEffect } from "react";
import { SWRConfig } from "swr";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useSensorRecords } from ".";
import { createSupabaseUrl } from "@lib/requests/createSupabaseUrl";
import { getSensorRecords } from "@mocks/supabaseData/records";
import { supabase } from "@auth/supabase";
import { programaticSignup } from "@lib/testUtil";

type OnSuccessType = (data: definitions["records"][]) => void;
type OnFailType = (error: string) => void;

const HookWrapper: FC<{
  session: ReturnType<typeof supabase.auth.session>;
}> = ({ session, children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>
    <AuthProvider session={session}>{children}</AuthProvider>
  </SWRConfig>
);

const createTestComponent = (
  sensorId: number | undefined,
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { records, error, isLoading } = useSensorRecords({
      sensorId,
      startDateString: "2021-09-08T20:09:12.000-02:00",
      endDateString: "2021-10-13T22:39:10.000-02:00",
    });
    useEffect(() => {
      if (records && !error && !isLoading) onSuccess(records);
      if (error) onFail(error.message);
    }, [records, error, isLoading]);
    return <div />;
  };
  return TestComponent;
};

describe("useSensorRecords hook", () => {
  test("should return an empty array if no sensorId", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: definitions["records"][]): void => {
      onSuccess(data);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(
      undefined,
      onSuccessWrapper,
      onError
    );
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith([]);
      expect(onError).not.toHaveBeenCalled();
    });
  });
  test("should return an array of records with sensorId", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: definitions["records"][]): void => {
      onSuccess(data.length > 0);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(1, onSuccessWrapper, onError);
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(true);
      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe("deleteRecords", () => {
    it("deletes records", async () => {
      const parentSensorId = 4;
      const records = getSensorRecords({
        sensorId: parentSensorId,
        numberOfRecords: 10,
      });
      const server = setupServer(
        rest.get(createSupabaseUrl(`/records`), (_req, res, ctx) => {
          return res(ctx.status(201, "Mocked status"), ctx.json(records));
        }),
        rest.delete(createSupabaseUrl(`/records`), (_req, res, ctx) => {
          return res(ctx.status(201, "Mocked status"));
        })
      );
      server.listen();
      const session = await programaticSignup({
        email: "test@email.com",
        password: "password",
      });
      const HookWrapper: FC = ({ children }) => (
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <AuthProvider session={session}>{children}</AuthProvider>
        </SWRConfig>
      );
      const { result, waitForNextUpdate } = renderHook(
        () => useSensorRecords({ sensorId: parentSensorId }),
        {
          wrapper: HookWrapper,
        }
      );
      const { waitForNextUpdate: waitForAuth } = renderHook(() => useAuth(), {
        wrapper: HookWrapper,
      });

      await waitForAuth();

      const recordsIds = records
        .slice(-4, records.length - 1)
        .map(record => record.id);

      await waitForNextUpdate();

      await act(async () => {
        await result.current.deleteRecords(recordsIds);
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });
    it("fails when no ids are provided", async () => {
      const parentSensorId = 4;
      const records = getSensorRecords({
        sensorId: parentSensorId,
        numberOfRecords: 10,
      });
      const server = setupServer(
        rest.get(createSupabaseUrl(`/records`), (_req, res, ctx) => {
          return res(ctx.status(201, "Mocked status"), ctx.json(records));
        }),
        rest.delete(createSupabaseUrl(`/records`), (_req, res, ctx) => {
          return res(ctx.status(201, "Mocked status"));
        })
      );
      server.listen();
      const { result, waitForNextUpdate } = renderHook(
        () => useSensorRecords({ sensorId: parentSensorId }),
        {
          wrapper: HookWrapper,
        }
      );

      await waitForNextUpdate();

      await act(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await result.current.deleteRecords();
      });

      await waitFor(() => {
        expect(result.current.error?.message).toBe(
          "To delete records please provide a sensor id and record ids"
        );
      });
    });
  });
});
