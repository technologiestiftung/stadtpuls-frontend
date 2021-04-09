import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { StoreProvider } from "easy-peasy";

import theme from "../../style/theme";
import store from "../../state/store";
import { ProjectPreview } from ".";
import { projectsResponse } from "@mocks/data";
import { ProjectType } from "@common/interfaces";

export default {
  title: "ProjectPreview",
  component: ProjectPreview,
} as Meta;

const Template: Story<ProjectType> = args => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <ProjectPreview {...args} />
    </ThemeProvider>
  </StoreProvider>
);

export const Default = Template.bind({});
Default.args = projectsResponse.data.projects[0];
