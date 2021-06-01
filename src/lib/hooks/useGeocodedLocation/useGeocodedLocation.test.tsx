import { FC, useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import useGeocodedLocation from ".";
import { SWRConfig } from "swr";

type DataType = ReturnType<typeof useGeocodedLocation>["viewport"];
type OnSuccessType = (data: DataType) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { isLoading, error, viewport } = useGeocodedLocation("Berlin");
    useEffect(() => {
      if (viewport && !error) onSuccess(viewport);
      if (error) onFail(error.message);
    }, [isLoading, viewport, error]);
    if (isLoading) return <p>Loading</p>;
    if (error) return <p>Error</p>;
    return <p>{viewport ? "viewport" : "no viewport"}</p>;
  };
  return TestComponent;
};

describe("useGeocodedLocation", () => {
  it("should get the project vewport", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (viewport: DataType): void => {
      onSuccess(viewport);
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
