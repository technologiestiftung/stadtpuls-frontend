import { render, screen } from "@testing-library/react";
import { LandingHero } from ".";

describe("LandingHero component", () => {
  it("should render a link to the sensors and docs", () => {
    render(<LandingHero />);
    const docsLink = screen.getByRole("link", { name: /Mitmachen/gi });
    expect(docsLink).toBeInTheDocument();
    const sensorsLink = screen.getByRole("link", { name: /Sensoren/gi });
    expect(sensorsLink).toBeInTheDocument();
  });
});
