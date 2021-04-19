import { Story, Meta } from "@storybook/react";
import { ProjectInfoFormWrapper, ProjectInfoFormWrapperPropType } from ".";

export default {
  title: "Forms/ProjectInfoFormWrapper",
  component: ProjectInfoFormWrapper,
} as Meta;

const Template: Story<ProjectInfoFormWrapperPropType> = args => (
  <ProjectInfoFormWrapper type={args.type}>
    {args.children}
  </ProjectInfoFormWrapper>
);

export const Edit = Template.bind({});
Edit.args = {
  type: "edit",
  children: <h1>{"Insert here: an edit project form"}</h1>,
};

export const Create = Template.bind({});
Create.args = {
  type: "create",
  children: <h1>{"Insert here: a create project form"}</h1>,
};
