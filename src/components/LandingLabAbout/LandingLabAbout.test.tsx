import { render, screen } from "@testing-library/react";
import { LandingLabAbout } from ".";

describe("LandingLabAbout component", () => {
  it("should render two headings", () => {
    render(<LandingLabAbout />);
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(2);
  });
});
