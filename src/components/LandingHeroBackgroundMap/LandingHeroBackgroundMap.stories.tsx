import { PublicSensorType } from "@common/interfaces";
import { curatedSensors } from "@mocks/supabaseData/sensors";
import { Story, Meta } from "@storybook/react";
import { LandingHeroBackgroundMap } from ".";

export default {
  title: "Promotional/LandingHeroBackgroundMap",
  component: LandingHeroBackgroundMap,
} as Meta;

const Template: Story<{
  sensor: PublicSensorType;
}> = args => <LandingHeroBackgroundMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  sensor: curatedSensors[0],
};
