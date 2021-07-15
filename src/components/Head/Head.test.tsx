import { render } from "@testing-library/react";
import { Head } from ".";
import * as nextRouter from "next/router";

const useRouter = jest.fn();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter.mockReturnValue({
  query: {},
  pathname: "/",
});

describe("Head component", () => {
  test("should render without crashing", () => {
    useRouter.mockReturnValue({
      query: {},
      pathname: "/",
    });
    render(<Head />);
  });
});
