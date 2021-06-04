import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../style/theme";

import ProjectsOverviewPage from "../../pages/projects";
import { fakeProjects } from "@components/LandingProjectsSlider/LandingProjectsSlider.stories";

describe("home page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProjectsOverviewPage
          projects={{
            count: fakeProjects.length,
            projects: fakeProjects,
          }}
        />
      </ThemeProvider>
    );
  });
});
