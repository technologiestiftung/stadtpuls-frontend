import { screen, render, waitFor } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import * as nextRouter from "next/router";
import theme from "../../style/theme";
import store from "../../state/store";
import { Project } from ".";
import { getProjectData } from "@lib/requests/getProjectData";
describe("Project component", () => {
  beforeAll(() => {
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
  });
  it("should render the Project title", async (): Promise<void> => {
    const project = await getProjectData(10);

    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Project {...project} />
        </ThemeProvider>
      </StoreProvider>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Temperatur Grunewaldstraße/gi)
      ).toBeInTheDocument()
    );
  });
  it("should render a link to go back to the projects list", async (): Promise<void> => {
    const project = await getProjectData(10);

    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Project {...project} />
        </ThemeProvider>
      </StoreProvider>
    );

    await waitFor(() =>
      expect(document.querySelector("a[href^='/projects']")).toBeInTheDocument()
    );
  });
});
