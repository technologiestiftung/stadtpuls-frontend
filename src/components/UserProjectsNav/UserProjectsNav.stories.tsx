import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { UserProjectsNav, UserProjectsNavType, ProjectListItemType } from ".";

const exampleProjects: ProjectListItemType[] = [
  {
    projectId: "kjasdhjkas",
    name: "Project A",
  },
  {
    projectId: "uisdzuada",
    name: "Project B",
  },
  {
    projectId: "tgedhebdm",
    name: "Project C",
  },
];

export default {
  title: "Layout/UserProjectsNav",
  component: UserProjectsNav,
  argTypes: { onSelectProject: { action: "clicked link" } },
} as Meta;

const Template: Story<UserProjectsNavType> = args => (
  <UserProjectsNav {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: exampleProjects,
  defaultSelectedProject: exampleProjects[0],
  onSelectProject: action("Function triggered when selected project changes"),
};

export const WithoutDefaultSelectedProject = Template.bind({});
WithoutDefaultSelectedProject.args = {
  projects: exampleProjects,
  onSelectProject: action("Function triggered when selected project changes"),
};
