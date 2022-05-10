import { render } from "@testing-library/react";
import { LineChart } from ".";

describe("LineChart component", () => {
  it("should render an svg of the right size", () => {
    const width = 400;
    const height = 200;
    render(
      <LineChart
        width={width}
        height={height}
        data={[
          {
            id: 1,
            date: new Date(),
            value: 20,
          },
        ]}
      />
    );
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute("width")).toBe(`${width}`);
    expect(svgElement?.getAttribute("height")).toBe(`${height}`);
  });
});
