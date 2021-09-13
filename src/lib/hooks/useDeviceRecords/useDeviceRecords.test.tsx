import { RecordsType } from "@common/types/supabase_DEPRECATED";
import { render, waitFor } from "@testing-library/react";
import { FC, useEffect } from "react";
import { SWRConfig } from "swr";
import { useDeviceRecords } from ".";

type OnSuccessType = (data: RecordsType[]) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  deviceId: number | undefined,
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { records, error, isLoading } = useDeviceRecords({
      deviceId,
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

describe("useDeviceRecords hook", () => {
  test("should return an empty array if no deviceId", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: RecordsType[]): void => {
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
  test("should return an array of records with deviceId", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: RecordsType[]): void => {
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
});
