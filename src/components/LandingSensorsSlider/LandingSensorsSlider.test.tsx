import { curatedSensors } from "@mocks/supabaseData/sensors";
import { render } from "@testing-library/react";
import { LandingSensorsSlider } from ".";

describe("LandingSensorsSlider component", () => {
  it("should 3 slides by project", () => {
    render(<LandingSensorsSlider sensors={curatedSensors} />);
    const headings = document.getElementsByClassName("swiper-slide");
    expect(headings).toHaveLength(curatedSensors.length);
  });
});
