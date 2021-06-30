import { AuthProvider } from "@auth/Auth";
import * as userDataHook from "@lib/hooks/useUserData";
import { render, screen, waitFor } from "@testing-library/react";
import { Header } from ".";

const originalUserDataHook = userDataHook.useUserData;

describe("Header component", () => {
  beforeEach(() => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = jest.fn().mockReturnValue({
      user: { name: "JohnDoe" },
    });
  });

  afterEach(() => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = originalUserDataHook;
  });
  it("should render the Stadtpuls logo", async () => {
    render(<Header />);
    const logo = screen.getByRole("img");
    await waitFor(() => expect(logo).toBeInTheDocument());
  });
  it("should render the tsb logo", async () => {
    render(<Header />);
    const logo = document.querySelector("svg");
    await waitFor(() => expect(logo).toBeInTheDocument());
  });
  it("should render the 'authentication' link if logged out", async () => {
    // Ignored because of the reassignment for mock purposes
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userDataHook.useUserData = jest.fn().mockReturnValue({
      user: null,
    });
    render(<Header />);
    const link = screen.getByText(/Anmeldung/g);
    await waitFor(() => expect(link).toBeInTheDocument());
  });
  it("should render the 'username' link if logged in", async () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const username = screen.getByText("JohnDoe");

    await waitFor(() => {
      expect(username).toBeInTheDocument();
    });
  });
});
