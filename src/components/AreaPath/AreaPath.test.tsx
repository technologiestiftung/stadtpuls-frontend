import { render } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "theme-ui";
import { AreaPath } from ".";
import theme from "../../style/theme";

describe("AreaPath component", () => {
  it("should render a path", () => {
    const width = 400;
    const height = 200;
    render(
      <ThemeProvider theme={theme}>
        <svg>
          <AreaPath
            width={width}
            height={height}
            data={[
              {
                date: new Date(),
                value: 20,
              },
            ]}
          />
        </svg>
      </ThemeProvider>
    );
    const svgElement = document.querySelector("path");
    expect(svgElement).toBeInTheDocument();
  });
});
