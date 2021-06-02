import { render, screen } from "@testing-library/react";
import { LandingLabAbout } from ".";

describe("LandingLabAbout component", () => {
  it("should render one headings", () => {
    render(<LandingLabAbout />);
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(1);
  });
});
