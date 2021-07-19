import { render, screen } from "@testing-library/react";
import { CityLABLogoSymbol } from ".";

describe("component CityLABLogoSymbol", () => {
  it("should render a link", () => {
    render(<CityLABLogoSymbol />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
  it("should render an svg", () => {
    render(<CityLABLogoSymbol />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
