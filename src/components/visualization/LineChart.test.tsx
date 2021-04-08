import { render } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "theme-ui";
import { LineChart } from "./LineChart";
import theme from "../../style/theme";

describe("Footer component", () => {
  it("should render an svg of the right size", () => {
    const width = 400;
    const height = 200;
    render(
      <ThemeProvider theme={theme}>
        <LineChart
          width={width}
          height={height}
          data={[
            {
              date: new Date(),
              value: 20,
            },
          ]}
        />
      </ThemeProvider>
    );
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute("width")).toBe(`${width}`);
    expect(svgElement?.getAttribute("height")).toBe(`${height}`);
  });
});
