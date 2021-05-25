import { Story, Meta } from "@storybook/react";
import { LandingHero } from ".";

export default {
  title: "Promotional/LandingHero",
  component: LandingHero,
} as Meta;

const Template: Story = args => <LandingHero {...args} />;

export const Default = Template.bind({});
Default.args = {};
