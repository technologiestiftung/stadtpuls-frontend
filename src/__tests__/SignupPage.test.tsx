import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";

import theme from "../style/theme";

import Signup from "../../pages/signup";

describe("signup page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <Signup />
      </ThemeProvider>
    );
  });
});
