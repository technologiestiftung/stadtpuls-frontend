import { withNextRouter } from "storybook-addon-next-router";
import { Story, Meta } from "@storybook/react";
import { SensorsGrid } from ".";
import { parsedSensors } from "@mocks/supabaseData/sensors";

export default {
  title: "Pages/SensorsGrid",
  component: SensorsGrid,
  decorators: [withNextRouter],
} as Meta;

const Template: Story = () => <SensorsGrid sensors={parsedSensors} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  nextRouter: {
    query: {
      id: 1,
    },
  },
};
