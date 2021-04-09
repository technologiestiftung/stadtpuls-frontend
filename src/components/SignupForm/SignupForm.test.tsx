import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignupForm } from ".";

describe("component SignupForm", () => {
  it("should render an email input", () => {
    render(<SignupForm />);
    const emailLabel = screen.getByText(/E-Mail/i);
    const emailInput = screen.getByRole("textbox");
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
    const emailInput = screen.getByRole("textbox");
    const conditionsCheckbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button");
    fireEvent.change(emailInput, {
      target: {
        value: "contact@example.com",
      },
    });
    fireEvent.click(conditionsCheckbox);
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(mySubmit).toHaveBeenCalledWith({
        email: "contact@example.com",
        areConditionsAccepted: true,
      })
    );
  });
});
