import { rest } from "msw";
import { setupServer } from "msw/node";
import { fakeDeviceRecords } from "@mocks/supabaseData/deviceRecords";
import { render, waitFor } from "@testing-library/react";
import { FC, useEffect } from "react";
import { SWRConfig } from "swr";
import { useDeviceLastRecordDate } from ".";
import { createApiUrl } from "@lib/requests/createApiUrl";
import { fakeDeviceWithRecords } from "@mocks/supabaseData/publicProjects";

type OnSuccessType = (data: string | undefined) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  deviceId: number | undefined,
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { lastRecordDate, error, isLoading } = useDeviceLastRecordDate(
      deviceId
    );
    useEffect(() => {
      if (!error && !isLoading) onSuccess(lastRecordDate);
      if (error) onFail(error.message);
    }, [lastRecordDate, error, isLoading]);
    return <div />;
  };
  return TestComponent;
};

describe("useLastDeviceRecord hook", () => {
  test("should return undefined if no deviceId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json([fakeDeviceWithRecords.records[0]])
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
  test("should return a record object with deviceId", async (): Promise<void> => {
    const server = setupServer(
      rest.get(createApiUrl(`/records`), (_req, res, ctx) => {
        return res(
          ctx.status(200, "Mocked status"),
          ctx.json([fakeDeviceWithRecords.records[0]])
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
      expect(onSuccess).toHaveBeenCalledWith(fakeDeviceRecords[0].recordedAt);
      expect(onError).not.toHaveBeenCalled();
      server.resetHandlers();
      server.close();
    });
  });
});
