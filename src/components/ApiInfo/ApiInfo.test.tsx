import { render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "theme-ui";
import { ApiInfo } from ".";
import theme from "../../style/theme";

const testApiRoutes = [
  {
    label: "one",
    domain: "https://somedomain.com",
    route: "endpoint/one",
  },
  {
    label: "two",
    domain: "https://somedomain.com",
    route: "endpoint/two",
  },
  {
    label: "three",
    domain: "https://somedomain.com",
    route: "endpoint/three",
  },
];

describe("Footer component", () => {
  it("should render a title with API as content", () => {
    render(
      <ThemeProvider theme={theme}>
        <ApiInfo entries={[]} />
      </ThemeProvider>
    );
    const title = screen.getByText("API");
    expect(title).toBeInTheDocument();
  });
  it("should render as many API titles as provided by the entries prop", () => {
    render(
      <ThemeProvider theme={theme}>
        <ApiInfo entries={testApiRoutes} />
      </ThemeProvider>
    );
    const one = screen.getByText("one");
    const two = screen.getByText("two");
    const three = screen.getByText("three");
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
    expect(three).toBeInTheDocument();
  });
});
