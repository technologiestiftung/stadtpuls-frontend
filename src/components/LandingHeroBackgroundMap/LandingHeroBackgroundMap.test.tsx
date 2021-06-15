import { fakeCuratedProjects } from "@mocks/supabaseData/publicProjects";
import { render } from "@testing-library/react";
import { LandingHeroBackgroundMap } from ".";

describe("LandingHeroBackgroundMap component", () => {
  it("should render without crashing", () => {
    render(<LandingHeroBackgroundMap project={fakeCuratedProjects[0]} />);
  });
});
