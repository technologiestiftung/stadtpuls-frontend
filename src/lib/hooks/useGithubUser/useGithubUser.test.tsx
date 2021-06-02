import { FC, useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import useGithubUser from ".";
import { server } from "@mocks/server";
import { SWRConfig } from "swr";

type DataType = ReturnType<typeof useGithubUser>["user"];
type OnLoadUserSuccessType = (data: DataType) => void;
type OnLoadUserFailType = (error: string) => void;

const createTestComponent = (
  username: string,
  onSuccess: OnLoadUserSuccessType = jest.fn(),
  onFail: OnLoadUserFailType = jest.fn()
): FC => {
  const TestComponent: FC = () => {
    const { user, error } = useGithubUser(username);

    useEffect(() => {
      if (!!user && !error) onSuccess(user);
      if (error) onFail(error.message);
    }, [user, error]);

    if (!user && !error) return <p>Loading</p>;
    if (error) return <p>Error</p>;
    return <p>{user?.login}</p>;
  };
  return TestComponent;
};
describe("useGithubUser", () => {
  it("should get the github user", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (user: DataType): void => {
      onSuccess(user);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(
      "vogelino",
      onSuccessWrapper,
      onError
    );

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
    server.use(rest.get("*", (_req, res) => res.networkError("Error")));
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const onErrorWrapper = (error: string): void => {
      onError(error ? true : false);
    };
    const TestComponent = createTestComponent(
      "dnsos",
      onSuccess,
      onErrorWrapper
    );
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });
});
