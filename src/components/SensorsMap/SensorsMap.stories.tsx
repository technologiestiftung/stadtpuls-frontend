import { Story } from "@storybook/react";
import { SensorsMap } from ".";
import { parsedSensors } from "@mocks/supabaseData/sensors";

export default {
  title: "Pages/SensorsMap",
  component: SensorsMap,
};

const Template: Story = () => <SensorsMap sensors={parsedSensors} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
