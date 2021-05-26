import { render } from "@testing-library/react";
import { SimpleMap } from ".";

describe("SimpleMap component", () => {
  it("should render a map container", (): void => {
    render(<SimpleMap mapWidth={600} mapHeight={300} />);
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    );
    expect(mapContainer).toBeInTheDocument();
  });
});
