import { curatedSensors } from "@mocks/supabaseData/sensors";
import { render } from "@testing-library/react";
import { LandingProjectsSlider } from ".";

describe("LandingProjectsSlider component", () => {
  it("should 3 slides by project", () => {
    render(<LandingProjectsSlider sensors={curatedSensors} />);
    const headings = document.getElementsByClassName("swiper-slide");
    expect(headings).toHaveLength(curatedSensors.length);
  });
});
