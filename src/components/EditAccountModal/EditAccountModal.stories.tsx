import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditAccountModal, EditAccountModalPropType } from ".";

export default {
  title: "Forms/EditAccountModal",
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
        "A function called when the 'delete sensor' button is clicked",
    },
  },
} as Meta;

const Template: Story<EditAccountModalPropType> = args => (
  <EditAccountModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultValues: {
    id: "1",
    username: "vogelino",
    email: "contact@vogelino.com",
    displayName: "Vogelino",
    description: "I am a cat",
    link: "https://vogelino.com",
    createdAt: "2021-01-01T00:00:00.000Z",
    categories: [1, 2],
    sensorsCount: 1234,
    recordsCount: 1234567,
  },
  onSubmit: action("Form data submited"),
  onCancel: action("Form cancelled"),
  onDelete: action("Delete button clicked"),
};
