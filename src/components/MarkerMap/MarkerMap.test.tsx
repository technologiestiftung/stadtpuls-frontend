import { render } from "@testing-library/react";
import { MarkerMap } from ".";

describe("MarkerMap component", () => {
  it("should render a map container", (): void => {
    render(
      <MarkerMap
        markers={[
          {
            latitude: 0,
            longitude: 1,
            id: 1,
            isActive: true,
          },
        ]}
        clickHandler={jest.fn()}
      />
    );
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    );
    expect(mapContainer).toBeInTheDocument();
  });
});
