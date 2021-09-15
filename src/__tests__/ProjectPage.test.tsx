import { render } from "@testing-library/react";
import * as nextRouter from "next/router";
import { ThemeProvider } from "theme-ui";

import theme from "../style/theme";

import ProjectPage from "../../pages/[id]";
import { getProjectData } from "@lib/requests/getProjectData_DEPRECATED";

describe("project page", () => {
  it("should render without failing", async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextRouter.useRouter = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nextRouter.useRouter.mockImplementation(() => ({
      query: { id: 1 },
      prefetch: () => Promise.resolve(true),
    }));

    const project = await getProjectData(10);

    render(
      <ThemeProvider theme={theme}>
        <ProjectPage project={project} />
      </ThemeProvider>
    );
  });
});
