import { render } from "@testing-library/react";
import { ThemeProvider } from "theme-ui";
import theme from "../style/theme";

import ProjectsOverviewPage from "../../pages/sensors";
import { fakeCuratedProjects } from "@mocks/supabaseData/publicProjects";

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
