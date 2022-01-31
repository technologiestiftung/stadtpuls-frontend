import { Story } from "@storybook/react";
import { SensorsList } from ".";
import { parsedSensors } from "@mocks/supabaseData/sensors";

export default {
  title: "Pages/SensorsList",
  component: SensorsList,
};

const Template: Story = () => <SensorsList sensors={parsedSensors} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
