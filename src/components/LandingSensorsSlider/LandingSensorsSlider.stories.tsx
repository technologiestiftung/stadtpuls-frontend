import { PublicSensorType } from "@common/interfaces";
import { curatedSensors } from "@mocks/supabaseData/sensors";
import { Story, Meta } from "@storybook/react";
import { LandingSensorsSlider } from ".";

export default {
  title: "Promotional/LandingSensorsSlider",
  component: LandingSensorsSlider,
} as Meta;

const Template: Story<{
  sensors: PublicSensorType[];
}> = args => <LandingSensorsSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  sensors: curatedSensors,
};
