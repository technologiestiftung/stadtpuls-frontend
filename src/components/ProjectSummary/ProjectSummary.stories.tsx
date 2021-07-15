import { Story, Meta } from "@storybook/react";
import { ProjectSummary } from ".";

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
}> = args => <ProjectSummary {...args} />;

export const Default = Template.bind({});
