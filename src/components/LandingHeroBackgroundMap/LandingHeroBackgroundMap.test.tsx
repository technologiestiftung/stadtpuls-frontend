import { curatedSensors } from "@mocks/supabaseData/sensors";
import { render } from "@testing-library/react";
import { LandingHeroBackgroundMap } from ".";

describe("LandingHeroBackgroundMap component", () => {
  it("should render without crashing", () => {
    render(
      <LandingHeroBackgroundMap
        sensors={curatedSensors}
        activeMarkerIndex={0}
        onMarkerClick={jest.fn()}
      />
    );
  });
});
