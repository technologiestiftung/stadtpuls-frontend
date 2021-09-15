import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor } from "@testing-library/react";
import { FC, useEffect } from "react";
import { SWRConfig } from "swr";
import { useSensorLastRecordDate } from ".";
import { createApiUrl } from "@lib/requests/createApiUrl";
import { sensors } from "@mocks/supabaseData/sensors";

const exampleSensor = sensors.withHttpIntegration[0];

type OnSuccessType = (data: string | undefined) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  sensorId: number | undefined,
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { lastRecordDate, error, isLoading } = useSensorLastRecordDate(
      sensorId
    );
    useEffect(() => {
      if (!error && !isLoading) onSuccess(lastRecordDate);
      if (error) onFail(error.message);
    }, [lastRecordDate, error, isLoading]);
    return <div />;
  };
  return TestComponent;
};

describe("useSensorLastRecordDate hook", () => {
  test("should return undefined if no sensorId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json([exampleSensor.records[0]])
        );
      })
    );
    server.listen();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const TestComponent = createTestComponent(undefined, onSuccess, onError);
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(undefined);
      expect(onError).not.toHaveBeenCalled();
      server.resetHandlers();
      server.close();
    });
  });
  test("should return a record object with sensorId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json([exampleSensor.records[0]])
        );
      })
    );
    server.listen();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const TestComponent = createTestComponent(1, onSuccess, onError);
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(
        exampleSensor.records[0].recorded_at
      );
      expect(onError).not.toHaveBeenCalled();
      server.resetHandlers();
      server.close();
    });
  });
});
