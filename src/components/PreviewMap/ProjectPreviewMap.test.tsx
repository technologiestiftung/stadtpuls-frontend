import { render } from "@testing-library/react";
import { PreviewMap } from ".";

describe("PreviewMap component", () => {
  it("should render a map container", (): void => {
    render(<PreviewMap viewport={{}} mapWidth={600} mapHeight={300} />);
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    );
    expect(mapContainer).toBeInTheDocument();
  });
});
