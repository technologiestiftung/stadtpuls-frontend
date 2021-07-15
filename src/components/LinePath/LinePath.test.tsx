import { render } from "@testing-library/react";
import React from "react";
import { LinePath } from ".";

describe("LinePath component", () => {
  it("should render a path", () => {
    const width = 400;
    const height = 200;
    render(
      <svg>
        <LinePath
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
