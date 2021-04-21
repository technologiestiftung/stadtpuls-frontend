import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ProjectInfoFormWrapper, ProjectInfoFormWrapperPropType } from ".";

export default {
  title: "Forms/ProjectInfoFormWrapper",
  component: ProjectInfoFormWrapper,
  argTypes: {
    handleCancel: {
      description:
        "A function called when the form is cancelled without submit",
    },
  },
} as Meta;

const Template: Story<ProjectInfoFormWrapperPropType> = args => (
  <ProjectInfoFormWrapper {...args}>{args.children}</ProjectInfoFormWrapper>
);

export const Edit = Template.bind({});
Edit.args = {
  type: "edit",
  handleCancel: action("Handled cancelling the form"),
  children: <h1>{"Insert here: an edit project form"}</h1>,
};

export const Create = Template.bind({});
Create.args = {
  type: "create",
  handleCancel: action("Handled cancelling the form"),
  children: <h1>{"Insert here: a create project form"}</h1>,
};
