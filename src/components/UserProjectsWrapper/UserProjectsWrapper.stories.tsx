import { Story, Meta } from "@storybook/react";
import { withNextRouter } from "storybook-addon-next-router";
import { UserProjectsWrapper, UserProjectWrapperType } from ".";
import { ProjectListItemType } from "@components/UserProjectsNav";

const exampleProjects: ProjectListItemType[] = [
  {
    projectId: "1",
    name: "Project A",
  },
  {
    projectId: "2",
    name: "Project B",
  },
  {
    projectId: "3",
    name: "Project C",
  },
];

export default {
  title: "Layout/UserProjectsWrapper",
  component: UserProjectsWrapper,
  decorators: [withNextRouter],
} as Meta;

const Template: Story<UserProjectWrapperType> = args => (
  <UserProjectsWrapper {...args}>{args.children}</UserProjectsWrapper>
);

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    query: {
      id: "1",
    },
  },
};
Default.args = {
  projects: exampleProjects,
  children: <h1>{"Insert here: the main content"}</h1>,
};