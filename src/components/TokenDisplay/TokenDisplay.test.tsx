import { render, screen } from "@testing-library/react";
import { TokenDisplay } from ".";

describe("TokenDisplay component", () => {
  it("should render a loading message by default", () => {
    render(<TokenDisplay />);
    const loadingMessage = screen.getByText(
      /\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */i
    );
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should render a token when provided children without error", () => {
    render(<TokenDisplay>1234</TokenDisplay>);
    const token = screen.getByText(/1234/i);
    expect(token).toBeInTheDocument();
  });

  it("should render an error message when error", () => {
    render(<TokenDisplay hasError={true}>Something went wrong</TokenDisplay>);
    const errorMessage = screen.getByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should visually indicate error when error", () => {
    render(<TokenDisplay hasError={true}>Something went wrong</TokenDisplay>);
    const tokenDisplay = screen.getByLabelText("Token");
    expect(tokenDisplay.getAttribute("class")?.includes("text-error")).toBe(
      true
    );
    expect(tokenDisplay.getAttribute("class")?.includes("border-error")).toBe(
      true
    );
  });
});
