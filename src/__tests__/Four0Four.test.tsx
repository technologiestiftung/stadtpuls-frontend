import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";

import theme from "../style/theme";

import Four0FourPage from "../../pages/404";

describe("404 page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <Four0FourPage />
      </ThemeProvider>
    );
  });
});
