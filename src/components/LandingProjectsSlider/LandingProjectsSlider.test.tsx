import { fakeCuratedProjects } from "@mocks/supabaseData/publicProjects";
import { render } from "@testing-library/react";
import { LandingProjectsSlider } from ".";

describe("LandingProjectsSlider component", () => {
  it("should 3 slides by project", () => {
    render(<LandingProjectsSlider projects={fakeCuratedProjects} />);
    const headings = document.getElementsByClassName("swiper-slide");
    expect(headings).toHaveLength(fakeCuratedProjects.length);
  });
});
