import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import theme from "../../style/theme";
import store from "../../state/store";
import { Overview } from ".";
import { getPublicProjects } from "@lib/hooks/usePublicProjects";
import { publicProjectsData } from "@mocks/supabaseData";

describe("Overview component", () => {
  it("should render the fisrt project", async (): Promise<void> => {
    const data = await getPublicProjects(0, 50);
    if (data)
      render(
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <Overview {...data} />
          </ThemeProvider>
        </StoreProvider>
      );

    const h1 = screen.getByText(publicProjectsData[0].name);
    expect(h1).toBeInTheDocument();
  });
});
