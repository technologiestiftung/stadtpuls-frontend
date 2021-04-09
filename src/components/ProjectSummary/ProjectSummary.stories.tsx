import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { ProjectSummary } from ".";

export default {
  title: "ProjectSummary",
  component: ProjectSummary,
} as Meta;

const Template: Story<{
  title: string;
  description: string;
  noOfDevices: number;
}> = args => (
  <ThemeProvider theme={theme}>
    <ProjectSummary {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  description: "Description",
  noOfDevices: 12,
};
