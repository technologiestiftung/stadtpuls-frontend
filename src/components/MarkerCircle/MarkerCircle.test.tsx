import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { MarkerCircle } from ".";

describe("MarkerCircle component", () => {
  it("should render its children", () => {
    render(
      <ThemeProvider theme={theme}>
        <MarkerCircle isActive>CHILD HERE</MarkerCircle>
      </ThemeProvider>
    );
    const moreInfoLink = screen.getByText(/CHILD HERE/g);
    expect(moreInfoLink).toBeInTheDocument();
  });
});
