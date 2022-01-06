import { render, screen } from "@testing-library/react";
import React from "react";
import { ChartThumbnail } from ".";

describe("ChartThumbnail component", () => {
  it("should render a path and a line", () => {
    render(
      <ChartThumbnail
        data={[
          {
            date: new Date().toISOString(),
            value: 20,
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
  it("should render a formatted value and date", () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 2);
    render(
      <ChartThumbnail
        data={[
          {
            date: date.toISOString(),
            value: 123456789,
          },
        ]}
      />
    );
    const valueText = screen.getByText("123.456.789");
    const dateText = screen.getByText("Zul. 2 months ago");
    expect(valueText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
  });
});
