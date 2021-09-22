import { render } from "@testing-library/react";
import { SensorPreviewMap } from ".";

describe("SensorPreviewMap component", () => {
  it("should render a map container", (): void => {
    render(<SensorPreviewMap viewport={{}} mapWidth={600} mapHeight={300} />);
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    );
    expect(mapContainer).toBeInTheDocument();
  });
});
