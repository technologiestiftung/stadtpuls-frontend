import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../style/theme";

import Signin from "../../pages/signin";

describe("signin page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <Signin />
      </ThemeProvider>
    );
  });
});
