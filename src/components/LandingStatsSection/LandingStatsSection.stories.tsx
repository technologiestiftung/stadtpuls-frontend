import { LandingStatsReturnType } from "@lib/requests/getLandingStats";
import { Story, Meta } from "@storybook/react";
import { LandingStatsSection } from ".";

export default {
  title: "Promotional/LandingStatsSection",
  component: LandingStatsSection,
} as Meta;

const Template: Story<LandingStatsReturnType> = stats => (
  <LandingStatsSection stats={stats} />
);

export const Default = Template.bind({});
Default.args = {
  usersCount: 123,
  devicesCount: 432,
  recordsCount: 100234,
};
