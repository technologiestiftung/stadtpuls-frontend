import { render, screen } from "@testing-library/react";
import { LandingProjectAbout } from ".";

describe("LandingProjectAbout component", () => {
  it("should render a heading", () => {
    render(<LandingProjectAbout />);
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(1);
  });
});
