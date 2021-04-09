import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "theme-ui";

import theme from "../../style/theme";
import { ProjectSummary } from ".";
import { projectsResponse } from "@mocks/data";

export default {
  title: "ProjectSummary",
  component: ProjectSummary,
  argTypes: {
    title: {
      description: "Title of the project",
    },
    description: {
      description: "Description of the project",
    },
    noOfDevices: {
      control: { type: "range", min: 0, max: 100 },
      description: "Number of devices in the project",
    },
  },
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
  title: projectsResponse.data.projects[0].title || "",
  description: projectsResponse.data.projects[0].description || "",
  noOfDevices: 5,
};
