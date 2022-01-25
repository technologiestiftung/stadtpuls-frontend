import { render, screen } from "@testing-library/react";
import React from "react";
import { ChartThumbnail } from ".";

describe("ChartThumbnail component", () => {
  it("should render a path and a line if data", () => {
    render(
      <ChartThumbnail
        data={[
          {
            date: new Date().toISOString(),
            value: 20,
          },
          {
            date: new Date().toISOString(),
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
            date: new Date().toISOString(),
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
    const dateA = new Date();
    dateA.setMonth(dateA.getMonth() - 4);
    const dateB = new Date();
    dateB.setMonth(dateB.getMonth() - 2);
    render(
      <ChartThumbnail
        data={[
          {
            date: dateB.toISOString(),
            value: 123456789,
          },
          {
            date: dateA.toISOString(),
            value: 0,
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
