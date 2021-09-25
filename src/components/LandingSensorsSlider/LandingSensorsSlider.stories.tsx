import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { curatedSensors } from "@mocks/supabaseData/sensors";
import { Story, Meta } from "@storybook/react";
import { LandingSensorsSlider } from ".";

export default {
  title: "Promotional/LandingSensorsSlider",
  component: LandingSensorsSlider,
} as Meta;

const Template: Story<{
  sensors: ParsedSensorType[];
}> = args => <LandingSensorsSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  sensors: curatedSensors,
};
