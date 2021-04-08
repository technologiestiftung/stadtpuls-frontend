import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { NotFoundPage } from ".";

describe("NotFoundPage component", () => {
  it("should render the 404 message", (): void => {
    render(
      <ThemeProvider theme={theme}>
        <NotFoundPage />
      </ThemeProvider>
    );

    const message = screen.getByText(
      /Die angeforderte Seite existiert nicht/gi
    );
    expect(message).toBeInTheDocument();
  });
  it("should render a back link", (): void => {
    render(
      <ThemeProvider theme={theme}>
        <NotFoundPage />
      </ThemeProvider>
    );

    const backLink = screen.getByText(/Zurück zur/gi);
    expect(backLink).toBeInTheDocument();
  });
});
