import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import theme from "../../style/theme";
import store from "../../state/store";
import { ProjectPreview } from ".";

describe("ProjectPreview component", () => {
  it("should render the title, subtitle and text", (): void => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <ProjectPreview
            id={1}
            title='Title'
            city='Berlin'
            description='Description'
          />
        </ThemeProvider>
      </StoreProvider>
    );

    const title = screen.getByText(/Title/gi);
    const city = screen.getByText(/Berlin/gi);
    const description = screen.getByText(/Description/gi);
    expect(title).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
