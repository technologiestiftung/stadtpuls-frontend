import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ProjectInfoFormWrapper, ProjectInfoFormWrapperPropType } from ".";

export default {
  title: "Forms/ProjectInfoFormWrapper_DEPRECATED",
  component: ProjectInfoFormWrapper,
  argTypes: {
    handleCancel: {
      description:
        "A function called when the form is cancelled without submit",
    },
    handleDelete: {
      description:
        "A function called that will start the deletion process of a project",
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
  handleDelete: action("Clicked the delete button"),
  children: <h1>{"Insert here: an edit project form"}</h1>,
};

export const Create = Template.bind({});
Create.args = {
  type: "create",
  handleCancel: action("Handled cancelling the form"),
  children: <h1>{"Insert here: a create project form"}</h1>,
};
