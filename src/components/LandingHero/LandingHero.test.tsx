import { render, screen } from "@testing-library/react";
import { LandingHero } from ".";

describe("LandingHero component", () => {
  it("should render a link to the projects", () => {
    render(<LandingHero />);
    const docsLink = screen.getByRole("link", { name: /Mitmachen/gi });
    expect(docsLink).toBeInTheDocument();
  });
});
