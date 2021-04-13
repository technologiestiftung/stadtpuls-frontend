import { render, screen } from "@testing-library/react";
import { TsbLogoSymbol } from ".";

describe("component TsbLogoSymbol", () => {
  it("should render a link", () => {
    render(<TsbLogoSymbol />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
  it("should render an svg", () => {
    render(<TsbLogoSymbol />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
