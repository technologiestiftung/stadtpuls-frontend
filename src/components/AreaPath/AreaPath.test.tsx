import { render } from "@testing-library/react";
import React from "react";
import { AreaPath } from ".";

describe("AreaPath component", () => {
  it("should render a path", () => {
    const width = 400;
    const height = 200;
    render(
      <svg>
        <AreaPath
          width={width}
          height={height}
          data={[
            {
              date: new Date().toISOString(),
              value: 20,
            },
          ]}
        />
      </svg>
    );
    const svgElement = document.querySelector("path");
    expect(svgElement).toBeInTheDocument();
  });
});
