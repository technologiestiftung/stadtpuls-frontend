import { render } from "@testing-library/react";
import { LandingHeroBackgroundMap } from ".";
import { fakeProjects } from "../LandingProjectsSlider/LandingProjectsSlider.stories";

describe("LandingHeroBackgroundMap component", () => {
  it("should render without crashing", () => {
    render(<LandingHeroBackgroundMap project={fakeProjects[0]} />);
  });
});
