import { PublicSensorType } from "@common/interfaces";
import { curatedSensors } from "@mocks/supabaseData/sensors";
import { Story, Meta } from "@storybook/react";
import { LandingProjectsSlider } from ".";

export default {
  title: "Promotional/LandingProjectsSlider",
  component: LandingProjectsSlider,
} as Meta;

const Template: Story<{
  sensors: PublicSensorType[];
}> = (args, { loaded: { sensors } }) => (
  <LandingProjectsSlider {...args} {...sensors} />
);

export const Default = Template.bind({});
Default.args = {
  sensors: curatedSensors,
};
