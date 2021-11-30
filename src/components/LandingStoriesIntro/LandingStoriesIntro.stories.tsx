import { Story, Meta } from "@storybook/react";
import { LandingStoriesIntro } from ".";

export default {
  title: "Promotional/LandingStoriesIntro",
  component: LandingStoriesIntro,
} as Meta;

const Template: Story = () => <LandingStoriesIntro />;

export const Default = Template.bind({});
