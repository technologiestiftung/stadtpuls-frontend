import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { CookieBanner } from ".";

describe("CookieBanner component", () => {
  it("should render the data privacy link", () => {
    render(
      <ThemeProvider theme={theme}>
        <CookieBanner />
      </ThemeProvider>
    );
    const moreInfoLink = screen.getByText(/Weitere Informationen/g);
    expect(moreInfoLink).toBeInTheDocument();
  });
  it("should render the Info text", () => {
    render(
      <ThemeProvider theme={theme}>
        <CookieBanner />
      </ThemeProvider>
    );
    const infoText = screen.getByText(/Diese Webseite verwendet Cookies/g);
    expect(infoText).toBeInTheDocument();
  });
});
