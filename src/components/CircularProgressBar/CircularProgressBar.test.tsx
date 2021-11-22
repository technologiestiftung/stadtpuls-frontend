import { render, screen } from "@testing-library/react";
import { CircularProgressBar } from ".";

describe("CircularProgressBar component", () => {
  it("should render its children", () => {
    render(<CircularProgressBar>Hello</CircularProgressBar>);
    const child = screen.queryByText("Hello");
    expect(child).toBeInTheDocument();
  });
});
