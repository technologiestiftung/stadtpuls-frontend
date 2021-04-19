import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CreateProjectForm, ProjectForm } from ".";

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

const exampleIntegrations = [
  {
    name: "TTN",
    value: "TTN",
  },
];

export default {
  title: "Forms/CreateProjectForm",
  argTypes: {
    onSubmit: {
      description: "A callback called when the form has submitted",
    },
  },
} as Meta;

const Template: Story<ProjectForm> = args => <CreateProjectForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  categoryOptions: exampleCategories,
  integrationOptions: exampleIntegrations,
  onSubmit: action("Form data submited"),
};
