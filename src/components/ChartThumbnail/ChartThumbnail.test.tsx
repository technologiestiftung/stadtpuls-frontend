import { render, screen } from "@testing-library/react";
import { ChartThumbnail } from ".";

describe("ChartThumbnail component", () => {
  it("should render a path and a line if data", () => {
    render(
      <ChartThumbnail
        data={[
          {
            id: 1,
            date: new Date(),
            value: 20,
          },
          {
            id: 2,
            date: new Date(),
            value: 40,
          },
        ]}
      />
    );
    const svgElement = document.querySelector("svg");
    const pathElement = document.querySelector("path");
    const lineElement = document.querySelector("line");
    expect(svgElement).toBeInTheDocument();
    expect(pathElement).toBeInTheDocument();
    expect(lineElement).toBeInTheDocument();
  });
  it("should render a path and a line if not enough data", () => {
    render(
      <ChartThumbnail
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
    const pathElement = document.querySelector("path");
    const lineElement = document.querySelector("line");
    expect(svgElement).not.toBeInTheDocument();
    expect(pathElement).not.toBeInTheDocument();
    expect(lineElement).not.toBeInTheDocument();
  });
  it("should render a formatted value and date", () => {
    const dateA = new Date("2022-02-17T15:25:02.463Z");
    dateA.setMonth(dateA.getMonth() - 4);
    const dateB = new Date("2022-02-17T15:25:02.463Z");
    dateB.setMonth(dateB.getMonth() - 2);
    render(
      <ChartThumbnail
        data={[
          {
            id: 1,
            date: dateB,
            value: 123456789,
          },
          {
            id: 2,
            date: dateA,
            value: 0,
          },
        ]}
      />
    );
    const valueText = screen.getByText("123.456.789");
    const dateText = screen.getByText(/Zul\./);
    expect(valueText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
  });
});
