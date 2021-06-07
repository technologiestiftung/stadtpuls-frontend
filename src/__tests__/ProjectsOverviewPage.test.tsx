import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../style/theme";

import ProjectsOverviewPage from "../../pages/projects";
import { fakeCuratedProjects } from "@mocks/data";

describe("home page", () => {
  it("should render without failing", () => {
    render(
      <ThemeProvider theme={theme}>
        <ProjectsOverviewPage
          projects={{
            count: fakeCuratedProjects.length,
            projects: fakeCuratedProjects,
          }}
        />
      </ThemeProvider>
    );
  });
});
