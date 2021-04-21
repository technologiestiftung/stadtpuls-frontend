import { FC, useEffect } from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { useProjectCategories } from ".";
import { server } from "@mocks/server";
import { SWRConfig } from "swr";

type DataType = ReturnType<typeof useProjectCategories>["categories"];
type OnSuccessType = (data: DataType) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { isLoading, error, categories } = useProjectCategories();
    useEffect(() => {
      if (categories && !error) onSuccess(categories);
      if (error) onFail(error.message);
    }, [isLoading, categories, error]);
    if (isLoading) return <p>Loading</p>;
    if (error) return <p>Error</p>;
    return (
      <p>
        {categories && categories.length ? categories[0].name : "no categories"}
      </p>
    );
  };
  return TestComponent;
};

describe("useProjectCategories", () => {
  it("should get the project categories", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (categories: DataType): void => {
      onSuccess(categories);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(onSuccessWrapper, onError);

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );
    screen.debug();

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
