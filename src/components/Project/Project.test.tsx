import { FC, useEffect } from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import * as nextRouter from "next/router";
import theme from "../../style/theme";
import store from "../../state/store";
import { useStoreActions } from "../../state/hooks";
import { Project } from ".";

const ProjectWithData: FC = () => {
  const loadDevices = useStoreActions(action => action.projects.load);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  return <Project />;
};
describe("Project component", () => {
  it("should render the Project title", async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({
      query: { id: 1 },
      prefetch: () => Promise.resolve(true),
    }));

    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <ProjectWithData />
        </ThemeProvider>
      </StoreProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Test project A/gi)).toBeInTheDocument()
    );
  });
});
