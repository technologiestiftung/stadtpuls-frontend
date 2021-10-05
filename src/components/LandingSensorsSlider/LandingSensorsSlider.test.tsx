import { curatedSensors } from "@mocks/supabaseData/sensors";
import { render } from "@testing-library/react";
import { LandingSensorsSlider } from ".";

describe("LandingSensorsSlider component", () => {
  it("should render 3 slides", () => {
    render(<LandingSensorsSlider sensors={curatedSensors} />);
    const headings = document.getElementsByClassName("swiper-slide");
    expect(headings).toHaveLength(curatedSensors.length);
  });
});
