import { render, screen } from "@testing-library/react";
import { SignInUpFormWrapper } from ".";

describe("SignInUpFormWrapper component", () => {
  it("should render the children", () => {
    render(<SignInUpFormWrapper type='in'>Hello</SignInUpFormWrapper>);
    const child = screen.getByText("Hello");
    expect(child).toBeInTheDocument();
  });

  it("should have signin text when type is 'in'", () => {
    render(<SignInUpFormWrapper type='in'>Hello</SignInUpFormWrapper>);
    const title = screen.getByText(/Login/i);
    const switchQuestion = screen.getByText(/noch keinen Account/i);
    expect(title).toBeInTheDocument();
    expect(switchQuestion).toBeInTheDocument();
  });

  it("should have signup text when type is 'up'", () => {
    render(<SignInUpFormWrapper type='up'>Ciao</SignInUpFormWrapper>);
    const title = screen.getByText(/Registrierung/i);
    const switchQuestion = screen.getByText(/schon einen Account/i);
    expect(title).toBeInTheDocument();
    expect(switchQuestion).toBeInTheDocument();
  });
});
