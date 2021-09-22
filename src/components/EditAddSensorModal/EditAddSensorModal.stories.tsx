import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditAddSensorModal, EditAddSensorModalPropType } from ".";

export default {
  title: "Forms/EditAddSensorModal",
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

const Template: Story<EditAddSensorModalPropType> = args => (
  <EditAddSensorModal {...args} />
);

export const WithoutDefaultValues = Template.bind({});
WithoutDefaultValues.args = {
  title: "Add sensor",
  onSubmit: action("Form data submited"),
  onCancel: action("Form cancelled"),
  onDelete: (false as unknown) as () => void,
};

export const WithDefaultValues = Template.bind({});
WithDefaultValues.args = {
  title: "Edit sensor",
  defaultValues: {
    name: "A title",
    symbolId: 1,
    categoryId: 1,
    description: "A description",
    latitude: 48.8586383,
    longitude: 2.2946208,
    integration: "ttn",
    ttnDeviceId: "lorawan-rapsbi-123",
  },
  onSubmit: action("Form data submited"),
  onCancel: action("Form cancelled"),
  onDelete: action("Delete button clicked"),
};
