import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignupForm } from ".";
import * as uniqueHook from "@lib/hooks/useUniqueUsernameValidation";

describe("component SignupForm", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  uniqueHook.useUniqueUsernameValidation = jest
    .fn()
    .mockReturnValue({ isUnique: true, isLoading: false });
  it("should render an username input", () => {
    render(<SignupForm />);
    const usernameLabel = screen.getByText(/Nutzername/i);
    const usernameInput = screen.getByRole("textbox", { name: /Nutzername/i });
    expect(usernameLabel).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
  });
  it("should render an email input", () => {
    render(<SignupForm />);
    const emailLabel = screen.getByText(/E-Mail/i);
    const emailInput = screen.getByRole("textbox", { name: /E-Mail/i });
    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
  it("should render a checkbox label", () => {
    render(<SignupForm />);
    const conditionsLabel = screen.getByText(/Ich akzeptiere die/i);
    const conditionsCheckbox = screen.getByRole("checkbox");
    expect(conditionsLabel).toBeInTheDocument();
    expect(conditionsCheckbox).toBeInTheDocument();
  });
  it("should render a submit button", () => {
    render(<SignupForm />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
  it("should call the onSubmit handler on submit", async (): Promise<void> => {
    const mySubmit = jest.fn();
    render(<SignupForm onSubmit={mySubmit} />);
    const usernameInput = screen.getByRole("textbox", { name: /Nutzername/i });
    const emailInput = screen.getByRole("textbox", { name: /E-Mail/i });
    const conditionsCheckbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button");
    fireEvent.change(usernameInput, {
      target: {
        value: "example",
      },
    });
    fireEvent.change(emailInput, {
      target: {
        value: "contact@example.com",
      },
    });
    fireEvent.click(conditionsCheckbox);
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(mySubmit).toHaveBeenCalledWith({
        username: "example",
        email: "contact@example.com",
        areConditionsAccepted: true,
      })
    );
  });
  it("should not allow reserved words", async (): Promise<void> => {
    const mySubmit = jest.fn();
    render(<SignupForm onSubmit={mySubmit} />);
    const usernameInput = screen.getByRole("textbox", { name: /Nutzername/i });
    const submitButton = screen.getByRole("button");
    fireEvent.change(usernameInput, {
      target: {
        value: "sensor",
      },
    });
    usernameInput.focus();
    const errorMsg = screen.getByText(
      "Dieser Benutzername darf nicht verwendet werden"
    );
    expect(errorMsg).toBeInTheDocument();
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(mySubmit).not.toHaveBeenCalledWith({
        username: "sensor",
        email: "contact@example.com",
        areConditionsAccepted: true,
      })
    );
  });
});
