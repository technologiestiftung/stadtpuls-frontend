import { render } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "theme-ui";
import { LinePath } from "./LinePath";
import theme from "../../style/theme";

describe("Footer component", () => {
  it("should render a path", () => {
    const width = 400;
    const height = 200;
    render(
      <ThemeProvider theme={theme}>
        <svg>
          <LinePath
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
