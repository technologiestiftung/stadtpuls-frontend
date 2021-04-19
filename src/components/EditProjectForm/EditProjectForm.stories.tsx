import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditProjectForm, ProjectForm } from ".";

const exampleCategories = [
  {
    name: "some name A",
    value: "some value A",
  },
  {
    name: "some name B",
    value: "some value B",
  },
  {
    name: "some name C",
    value: "some value C",
  },
];

export default {
  title: "Forms/EditProjectForm",
  argTypes: {
    onSubmit: {
      description: "A callback called when the form has submitted",
    },
  },
} as Meta;

const Template: Story<ProjectForm> = args => <EditProjectForm {...args} />;

export const WithoutDefaultValues = Template.bind({});
WithoutDefaultValues.args = {
  categoryOptions: exampleCategories,
  onSubmit: action("Form data submited"),
};

export const WithDefaultValues = Template.bind({});
WithDefaultValues.args = {
  defaultValues: {
    title: "A title",
    category: exampleCategories.map(category => category.value)[
      exampleCategories.length - 1
    ],
    description: "A description",
    location: "A location",
  },
  categoryOptions: exampleCategories,
  onSubmit: action("Form data submited"),
};
