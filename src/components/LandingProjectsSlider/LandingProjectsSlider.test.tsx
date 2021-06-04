import { render } from "@testing-library/react";
import { LandingProjectsSlider } from ".";
import { fakeProjects } from "./LandingProjectsSlider.stories";

describe("LandingProjectsSlider component", () => {
  it("should 3 slides by project", () => {
    render(<LandingProjectsSlider projects={fakeProjects} />);
    const headings = document.getElementsByClassName("swiper-slide");
    expect(headings).toHaveLength(fakeProjects.length);
  });
});
