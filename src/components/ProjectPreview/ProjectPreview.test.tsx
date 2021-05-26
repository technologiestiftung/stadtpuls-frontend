import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";
import theme from "../../style/theme";
import store from "../../state/store";
import { ProjectPreview } from ".";
import { getPublicProjects } from "@lib/hooks/usePublicProjects";

describe("ProjectPreview component", () => {
  it("should render the title, subtitle and text", async (): Promise<void> => {
    const data = await getPublicProjects(500);
    if (data)
      render(
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <ProjectPreview
              id={0}
              name='Title'
              location='Berlin'
              description='Description'
              records={[]}
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
