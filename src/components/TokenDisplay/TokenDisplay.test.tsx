import { render, screen } from "@testing-library/react";
import { TokenDisplay } from ".";

describe("TokenDisplay component", () => {
  it("should render a loading message by default", () => {
    render(<TokenDisplay></TokenDisplay>);
    const loadingMessage = screen.getByText(/Token wird generiert/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should render a token when provided", () => {
    render(<TokenDisplay token='1234'></TokenDisplay>);
    const token = screen.getByText(/1234/i);
    expect(token).toBeInTheDocument();
  });

  it("should render an error message when error", () => {
    render(<TokenDisplay errorMessage='Something went wrong'></TokenDisplay>);
    const errorMessage = screen.getByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should visullay indicate error when error", () => {
    render(<TokenDisplay errorMessage='Something went wrong'></TokenDisplay>);
    const tokenDisplay = screen.getByLabelText("Token");
    expect(tokenDisplay.getAttribute("class")?.includes("text-red-500")).toBe(
      true
    );
    expect(tokenDisplay.getAttribute("class")?.includes("border-red-500")).toBe(
      true
    );
  });
});
