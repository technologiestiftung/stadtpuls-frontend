import { render } from "@testing-library/react";
import { StoreProvider } from "easy-peasy";
import { ThemeProvider } from "theme-ui";

import store from "@state/store";
import theme from "../style/theme";

import HomePage from "../../pages";

describe("page home", () => {
  it("should render without failing", () => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      </StoreProvider>
    );
  });
});
