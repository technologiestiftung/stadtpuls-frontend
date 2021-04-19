import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import theme from "../../style/theme";
import store from "../../state/store";
import { Overview } from ".";
import { getPublicProjects } from "@lib/hooks/usePublicProjects";

describe("Overview component", () => {
  it("should render the title, subtitle and text", async (): Promise<void> => {
    const data = await getPublicProjects(0, 50);
    if (data)
      render(
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <Overview {...data} />
          </ThemeProvider>
        </StoreProvider>
      );

    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");
    const text = screen.getByText(
      /Das Berlin IoT Hub ist eine prototypische Offene Datenplattform/gi
    );
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
