import { render } from "@testing-library/react";
import { ProjectPreviewMap } from ".";

describe("ProjectPreviewMap component", () => {
  it("should render a map container", (): void => {
    render(<ProjectPreviewMap mapWidth={600} mapHeight={300} />);
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    );
    expect(mapContainer).toBeInTheDocument();
  });
});
