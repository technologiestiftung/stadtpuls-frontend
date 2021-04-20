import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";

import theme from "../../style/theme";
import store from "../../state/store";
import { ProjectPreview } from ".";
import { ProjectType } from "@common/interfaces";
import { usePublicProjects } from "@lib/hooks/usePublicProjects";
import { FC } from "react";

export default {
  title: "ProjectPreview",
  component: ProjectPreview,
} as Meta;

const ProjectPreviewPage: FC = () => {
  const { data, error } = usePublicProjects();

  if (!data || error) return null;
  else return <ProjectPreview {...data.projects[0]} />;
};

const Template: Story<ProjectType> = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <ProjectPreviewPage />
    </ThemeProvider>
  </StoreProvider>
);

export const Default = Template.bind({});
Default.args = {};
