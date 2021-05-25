import { render } from "@testing-library/react";
import { StoreProvider } from "easy-peasy";
import { ThemeProvider } from "theme-ui";

import store from "@state/store";
import theme from "../../src/style/theme";

import UserPage from "../../pages/account/profile";

describe("userprofile page", () => {
  it("should render without failing", () => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <UserPage />
        </ThemeProvider>
      </StoreProvider>
    );
  });
});
