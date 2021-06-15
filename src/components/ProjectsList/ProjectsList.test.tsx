import { screen, render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../../style/theme";
import { ProjectsList } from ".";
import { getPublicProjects } from "@lib/hooks/usePublicProjects";
import { publicProjectsData } from "@mocks/supabaseData";
describe("ProjectsList component", () => {
  it("should render the fisrt project", async (): Promise<void> => {
    const data = await getPublicProjects();
    if (data)
      render(
        <ThemeProvider theme={theme}>
          <ProjectsList {...data} />
        </ThemeProvider>
      );

    const h1 = screen.getByText(publicProjectsData[0].name);
    expect(h1).toBeInTheDocument();
  });
});
