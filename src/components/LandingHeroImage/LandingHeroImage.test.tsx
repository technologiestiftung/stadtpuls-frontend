import { render, screen } from "@testing-library/react";
import { LandingHeroImage } from ".";

describe("LandingHeroImage", () => {
  it("should render an image", () => {
    render(<LandingHeroImage />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
});
