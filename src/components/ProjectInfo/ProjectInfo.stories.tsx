import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ProjectInfo, ProjectInfoPropType } from ".";

export default {
  title: "Layout/ProjectInfo",
  component: ProjectInfo,
  argTypes: { onEditProject: { action: "Clicked edit project" } },
} as Meta;

const ProjectInfoTemplate: Story<ProjectInfoPropType> = ({
  children,
  ...args
}) => <ProjectInfo {...args}>{children}</ProjectInfo>;

export const DefaultProjectInfo = ProjectInfoTemplate.bind({});
DefaultProjectInfo.args = {
  title: "Temperatur Grunewaldstraße",
  category: "Temperatur",
  projectViewLink: "/123abc",
  onEditProject: action("Clicked edit project"),
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};
