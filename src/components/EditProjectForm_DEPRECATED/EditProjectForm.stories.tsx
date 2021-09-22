import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditProjectForm, ProjectForm } from ".";

const exampleCategories = [
  {
    name: "some name A",
    value: "1",
  },
  {
    name: "some name B",
    value: "2",
  },
  {
    name: "some name C",
    value: "3",
  },
];

export default {
  title: "Forms/EditProjectForm_DEPRECATED",
  argTypes: {
    onSubmit: {
      description: "A callback called when the form has submitted",
    },
    onCancel: {
      description:
        "A function called when the form is cancelled without submit",
    },
    onDelete: {
      description:
        "A function called when the 'delete project' button is clicked",
    },
  },
} as Meta;

const Template: Story<ProjectForm> = args => <EditProjectForm {...args} />;

export const WithoutDefaultValues = Template.bind({});
WithoutDefaultValues.args = {
  categoryOptions: exampleCategories,
  onSubmit: action("Form data submited"),
  onCancel: action("Form cancelled"),
  onDelete: action("Delete project clicked"),
};

export const WithDefaultValues = Template.bind({});
WithDefaultValues.args = {
  defaultValues: {
    name: "A title",
    categoryId: parseInt(
      exampleCategories.map(category => category.value)[
        exampleCategories.length - 1
      ]
    ),
    description: "A description",
    location: "A location",
  },
  categoryOptions: exampleCategories,
  onSubmit: action("Form data submited"),
  onCancel: action("Form cancelled"),
  onDelete: action("Delete project clicked"),
};
