import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SensorsList } from ".";

export default {
  title: "Layout/SensorsList",
  component: SensorsList,
} as Meta;

const Template: Story<{
  sensors: {
    id: string | number;
    name: string;
    lastRecordedAt?: Date | null;
  }[];
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}> = args => <SensorsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  sensors: [
    { id: 1, name: "Neo", lastRecordedAt: new Date() },
    {
      id: "2",
      name: "Triniti",
      lastRecordedAt: new Date("2021-01-08T20:32:49.796Z"),
    },
    {
      id: Infinity,
      name: "Morpheus",
      lastRecordedAt: null,
    },
  ],
  onEdit: action("Edit action for sensor called"),
  onDelete: action("Delete action for sensor called"),
};
