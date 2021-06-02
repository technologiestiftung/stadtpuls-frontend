import { Story, Meta } from "@storybook/react";
import { LandingProjectAbout } from ".";

export default {
  title: "Promotional/LandingProjectAbout",
  component: LandingProjectAbout,
} as Meta;

const Template: Story = args => <LandingProjectAbout {...args} />;

export const Default = Template.bind({});
Default.args = {};
