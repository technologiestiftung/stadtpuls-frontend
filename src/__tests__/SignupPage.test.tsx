import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import * as swr from "swr";

import theme from "../style/theme";

import Signup from "../../pages/signup";

describe("signup page", () => {
  it("should render without failing", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swr.default = jest.fn().mockReturnValue({ isUnique: true });
    render(
      <ThemeProvider theme={theme}>
        <Signup />
      </ThemeProvider>
    );
  });
});
