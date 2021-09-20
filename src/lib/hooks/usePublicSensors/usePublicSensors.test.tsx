import { FC, useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { PublicSensors, usePublicSensors } from ".";
import { server } from "@mocks/server";
import { SWRConfig } from "swr";

type OnSuccessType = (data: PublicSensors) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { data, error } = usePublicSensors();
    useEffect(() => {
      if (data && !error) onSuccess(data);
      if (error) onFail(error.message);
    }, [data, error]);
    return <div>{data ? data.count : error?.message}</div>;
  };
  return TestComponent;
};

describe("hook usePublicProjects", () => {
  it("should provide a data and error value", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: PublicSensors): void => {
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
  it("should return an error if network has error", async (): Promise<void> => {
    const testError = "Mammamamamma";
    server.use(rest.get("*", (_req, res) => res.networkError(testError)));
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const onErrorWrapper = (error: string): void => {
      onError(error.includes(testError) ? true : false);
    };
    const TestComponent = createTestComponent(onSuccess, onErrorWrapper);
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onError).toHaveBeenLastCalledWith(true);
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });
});