import { FC, useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { ParsedSensorType, usePublicSensors } from ".";
import { SWRConfig } from "swr";

type OnSuccessType = (data: ParsedSensorType[]) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { sensors, error } = usePublicSensors();
    useEffect(() => {
      if (sensors && !error) onSuccess(sensors);
      if (error) onFail(error.message);
    }, [sensors, error]);
    return <div>{sensors ? sensors.length : error?.message}</div>;
  };
  return TestComponent;
};

describe("hook usePublicSensors", () => {
  it("should provide a data and error value", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: ParsedSensorType[]): void => {
      onSuccess(data);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(onSuccessWrapper, onError);
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });
  });
});
