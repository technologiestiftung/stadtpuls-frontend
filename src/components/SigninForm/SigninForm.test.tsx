import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SigninForm } from ".";

describe("component SigninForm", () => {
  it("should render an email input", () => {
    render(<SigninForm />);
    const emailLabel = screen.getByText(/E-Mail/i);
    const emailInput = screen.getByRole("textbox");
    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
  it("should render a submit button", () => {
    render(<SigninForm />);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
  it("should call the onSubmit handler on submit", async (): Promise<void> => {
    const mySubmit = jest.fn();
    render(<SigninForm onSubmit={mySubmit} />);
    const emailInput = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");
    fireEvent.change(emailInput, {
      target: {
        value: "contact@example.com",
      },
    });
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(mySubmit).toHaveBeenCalledWith({
        email: "contact@example.com",
      })
    );
  });
});
