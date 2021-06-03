import { Story, Meta } from "@storybook/react";
import { LandingLabAbout } from ".";

export default {
  title: "Promotional/LandingLabAbout",
  component: LandingLabAbout,
} as Meta;

const Template: Story = args => <LandingLabAbout {...args} />;

export const Default = Template.bind({});
Default.args = {};
