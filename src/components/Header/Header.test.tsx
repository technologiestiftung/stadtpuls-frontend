import * as userDataHook from "@lib/hooks/useUserData";
import { render, screen, waitFor } from "@testing-library/react";
import { Header } from ".";
import * as nextRouter from "next/router";

const useRouter = jest.fn();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = useRouter.mockReturnValue({
  query: {},
  pathname: "/",
});

const originalUserDataHook = userDataHook.useUserData;

describe("Header component", () => {
  beforeEach(() => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = jest.fn().mockReturnValue({
      user: { name: "JohnDoe" },
      authenticatedUser: { name: "JohnDoe" },
    });
  });

  afterEach(() => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = originalUserDataHook;
  });
  it("should render the 'login' link if logged out", async () => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = jest.fn().mockReturnValue({
      user: null,
    });
    render(<Header />);
    const link = screen.getByText(/Login/g);
    await waitFor(() => expect(link).toBeInTheDocument());
  });
  it("should render the 'logout' link if logged in", async () => {
    render(<Header />);
    const link = screen.getByText(/Logout/g);
    await waitFor(() => expect(link).toBeInTheDocument());
  });
});
