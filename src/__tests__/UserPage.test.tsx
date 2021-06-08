import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../src/style/theme";

import UserPage from "../../pages/account/profile";

describe("userprofile page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <UserPage />
      </ThemeProvider>
    );
  });
});
