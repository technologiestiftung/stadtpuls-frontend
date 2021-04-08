import { render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "theme-ui";
import { ApiInfo } from ".";
import theme from "../../style/theme";

describe("Footer component", () => {
  it("should render a title with API as content", () => {
    render(
      <ThemeProvider theme={theme}>
        <svg>
          <ApiInfo entries={[]} />
        </svg>
      </ThemeProvider>
    );
    const title = screen.getByText("API");
    expect(title).toBeInTheDocument();
  });
  it("should render as many API titles as provided by the entries prop", () => {
    render(
      <ThemeProvider theme={theme}>
        <svg>
          <ApiInfo
            entries={[
              { id: 1, name: "One" },
              { id: 2, name: "Two" },
              { id: 3, name: "Three" },
              { id: 4, name: "Four" },
            ]}
          />
        </svg>
      </ThemeProvider>
    );
    const one = screen.getByText("One");
    const two = screen.getByText("Two");
    const three = screen.getByText("Three");
    const four = screen.getByText("Four");
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
    expect(three).toBeInTheDocument();
    expect(four).toBeInTheDocument();
  });
  it("should render as many API routes as provided by the entries prop", () => {
    render(
      <ThemeProvider theme={theme}>
        <svg>
          <ApiInfo
            entries={[
              { id: 1, name: "One" },
              { id: 2, name: "Two" },
              { id: 3, name: "Three" },
              { id: 4, name: "Four" },
            ]}
          />
        </svg>
      </ThemeProvider>
    );
    const one = screen.getByText("/api/devices/1/records");
    const two = screen.getByText("/api/devices/2/records");
    const three = screen.getByText("/api/devices/3/records");
    const four = screen.getByText("/api/devices/4/records");
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
    expect(three).toBeInTheDocument();
    expect(four).toBeInTheDocument();
  });
});
