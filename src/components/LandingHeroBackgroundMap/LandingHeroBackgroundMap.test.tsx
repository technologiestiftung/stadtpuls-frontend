import { fakeCuratedProjects } from "@mocks/data";
import { render } from "@testing-library/react";
import { LandingHeroBackgroundMap } from ".";

describe("LandingHeroBackgroundMap component", () => {
  it("should render without crashing", () => {
    render(<LandingHeroBackgroundMap project={fakeCuratedProjects[0]} />);
  });
});
