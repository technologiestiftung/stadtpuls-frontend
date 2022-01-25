import { curatedSensors } from "@mocks/supabaseData/sensors";
import { Story, Meta } from "@storybook/react";
import { LandingHeroBackgroundMap, LandingHeroBackgroundMapPropType } from ".";

export default {
  title: "Promotional/LandingHeroBackgroundMap",
  component: LandingHeroBackgroundMap,
} as Meta;

const Template: Story<LandingHeroBackgroundMapPropType> = args => (
  <LandingHeroBackgroundMap {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sensors: curatedSensors,
  activeMarkerIndex: 0,
};
