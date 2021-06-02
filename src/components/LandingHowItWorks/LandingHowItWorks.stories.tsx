import { Story, Meta } from "@storybook/react";
import { LandingHowItWorks } from ".";

export default {
  title: "Promotional/LandingHowItWorks",
  component: LandingHowItWorks,
} as Meta;

const Template: Story = () => <LandingHowItWorks />;

export const Default = Template.bind({});
Default.args = {};
