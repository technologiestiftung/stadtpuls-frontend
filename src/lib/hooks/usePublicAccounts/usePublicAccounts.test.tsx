import { FC, useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { PublicAccountType, usePublicAccounts } from ".";
import { SWRConfig } from "swr";

type OnSuccessType = (data: PublicAccountType[]) => void;
type OnFailType = (error: string) => void;

const createTestComponent = (
  onSuccess: OnSuccessType,
  onFail: OnFailType
): FC => {
  const TestComponent: FC = () => {
    const { accounts, error } = usePublicAccounts();
    useEffect(() => {
      if (accounts.length > 0 && !error) onSuccess(accounts);
      if (error) onFail(error.message);
    }, [accounts, error]);
    return <div>{accounts ? accounts.length : error?.message}</div>;
  };
  return TestComponent;
};

describe("hook usePublicAccounts", () => {
  it("should provide a data and error value", async (): Promise<void> => {
    const onSuccess = jest.fn();
    const onSuccessWrapper = (data: PublicAccountType[]): void => {
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
