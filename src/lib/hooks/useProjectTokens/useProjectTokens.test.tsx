import { FC, useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useProjectTokens } from ".";
import { server } from "@mocks/server";
import { SWRConfig } from "swr";
import * as auth from "@auth/Auth";

type DataType = ReturnType<typeof useProjectTokens>["tokens"];
type OnLoadTokensSuccessType = (data: DataType) => void;
type OnLoadTokensFailType = (error: string) => void;
type OnCreateTokensSuccessType = (token: string) => void;
type OnCreateTokensFailType = (error: string) => void;

const createTestComponent = (
  projectId: number,
  onSuccess: OnLoadTokensSuccessType = jest.fn(),
  onFail: OnLoadTokensFailType = jest.fn(),
  onTokenCreationSuccess: OnCreateTokensSuccessType = jest.fn(),
  onTokenCreationFail: OnCreateTokensFailType = jest.fn()
): FC => {
  const TestComponent: FC = () => {
    const { tokens, error, createToken } = useProjectTokens(projectId);

    useEffect(() => {
      if (Array.isArray(tokens) && !error) onSuccess(tokens);
      if (error) onFail(error.message);
    }, [tokens, error, createToken]);

    useEffect(() => {
      const localCreateToken = async (): Promise<void> => {
        try {
          const token = await createToken("test");
          onTokenCreationSuccess(token);
        } catch (err) {
          onTokenCreationFail(new Error(err as string).message);
        }
      };
      void localCreateToken();
    }, [createToken]);

    if (!tokens && !error) return <p>Loading</p>;
    if (error) return <p>Error</p>;
    return (
      <p>{tokens && tokens.length ? tokens[0].description : "no categories"}</p>
    );
  };
  return TestComponent;
};
describe("useProjectTokens", () => {
  beforeAll(() => {
    // Ingored because of readonly reassignment for mocking purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({
      accessToken: "12345",
      authenticatedUser: {
        id: 1234,
      },
    });
  });
  it("should get the project tokens", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (tokens: DataType): void => {
      onSuccess(tokens);
    };
    const onError = jest.fn();
    const TestComponent = createTestComponent(1, onSuccessWrapper, onError);

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
    const TestComponent = createTestComponent(2, onSuccess, onErrorWrapper);
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
  it("should create a token", async (): Promise<void> => {
    const onCreateSuccess = jest.fn();
    const onCreateError = jest.fn();
    const onCreateSuccessWrapper = (token: string): void => {
      onCreateSuccess(token ? true : false);
    };

    const TestComponent = createTestComponent(
      2,
      undefined,
      undefined,
      onCreateSuccessWrapper,
      onCreateError
    );

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onCreateSuccess).toHaveBeenLastCalledWith(true);
      expect(onCreateError).not.toHaveBeenCalled();
    });
  });
  it("should fail to create a token if no access token", async (): Promise<void> => {
    // Ingored because of readonly reassignment for mocking purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    auth.useAuth = jest.fn().mockReturnValue({ accessToken: null });
    const onCreateSuccess = jest.fn();
    const onCreateError = jest.fn();

    const TestComponent = createTestComponent(
      4,
      undefined,
      undefined,
      onCreateSuccess,
      onCreateError
    );

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TestComponent />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(onCreateError).toHaveBeenLastCalledWith(
        "Error: Invalid accessToken while creating a token"
      );
      expect(onCreateSuccess).not.toHaveBeenCalled();
    });
  });
});
