import { Story, Meta } from "@storybook/react";
import { MarkerCircle } from ".";

export default {
  title: "Map/MarkerCircle",
  component: MarkerCircle,
} as Meta;

const Template: Story<{
  isActive: boolean;
}> = args => <MarkerCircle {...args} />;

export const Active = Template.bind({});
Active.args = { isActive: true };

export const Inactive = Template.bind({});
Inactive.args = { isActive: false };
