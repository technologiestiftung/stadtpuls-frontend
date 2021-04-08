import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { MarkerMap } from ".";

describe("MarkerMap component", () => {
  it("should render a map container", (): void => {
    render(
      <ThemeProvider theme={theme}>
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
          mapWidth={600}
          mapHeight={300}
        />
      </ThemeProvider>
    );
    const mapContainer = document.querySelector(
      "div[style^='position: absolute;']"
    );
    expect(mapContainer).toBeInTheDocument();
  });
});
