import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../src/style/theme";

import Four0FourPage from "../404";

describe("404 page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <Four0FourPage />
      </ThemeProvider>
    );
  });
});
