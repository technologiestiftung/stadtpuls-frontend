import { render } from "@testing-library/react";
import { StoreProvider } from "easy-peasy";
import * as nextRouter from "next/router";
import { ThemeProvider } from "theme-ui";

import store from "@state/store";
import theme from "../style/theme";

import ProjectPage from "../../pages/[id]";

describe("project page", () => {
  it("should render without failing", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      query: { id: 1 },
      prefetch: () => Promise.resolve(true),
    }));
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <ProjectPage />
        </ThemeProvider>
      </StoreProvider>
    );
  });
});