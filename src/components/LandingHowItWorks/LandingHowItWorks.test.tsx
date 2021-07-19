import { render, screen } from "@testing-library/react";
import { LandingHowItWorks } from ".";

describe("LandingHowItWorks component", () => {
  it("should render four headings", () => {
    render(<LandingHowItWorks />);
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(6);
  });
});
