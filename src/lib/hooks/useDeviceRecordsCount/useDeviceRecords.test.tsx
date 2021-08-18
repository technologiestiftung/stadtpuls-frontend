import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor } from "@testing-library/react";
import { FC, useEffect } from "react";
import { SWRConfig } from "swr";
import { useDeviceRecordsCount } from ".";
import { createApiUrl } from "@lib/requests/createApiUrl";

type OnSuccessType = (data: number | null) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  deviceId: number | undefined,
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { count, error, isLoading } = useDeviceRecordsCount(deviceId);
    useEffect(() => {
      if (!error && !isLoading) onSuccess(count);
      if (error) onFail(error.message);
    }, [count, error, isLoading]);
    return <div />;
  };
  return TestComponent;
};

describe("useDeviceRecordsCount hook", () => {
  test("should return an empty array if no deviceId", async (): Promise<void> => {
    const server = setupServer(
      rest.head(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.set("content-range", "0-28/29"),
          ctx.status(201, "Mocked status")
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
      expect(onSuccess).toHaveBeenCalledWith(null);
      expect(onError).not.toHaveBeenCalled();
      server.resetHandlers();
      server.close();
    });
  });
  test("should return an array of records with deviceId", async (): Promise<void> => {
    const server = setupServer(
      rest.head(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.set("content-range", "0-28/29"),
          ctx.status(201, "Mocked status")
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
      expect(onSuccess).toHaveBeenCalledWith(29);
      expect(onError).not.toHaveBeenCalled();
      server.resetHandlers();
      server.close();
    });
  });
});
