import { render, screen } from "@testing-library/react";
import { LandingHero } from ".";

describe("LandingHero component", () => {
  it("should render a link to the projects", () => {
    render(<LandingHero />);
    const projectsLink = screen.getByRole("link", { name: /Projekte/gi });
    expect(projectsLink).toBeInTheDocument();
  });
});
