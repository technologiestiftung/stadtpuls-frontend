import { Story, Meta } from "@storybook/react";
import { BetaBanner } from ".";

export default {
  title: "UI Elements/BetaBanner",
  component: BetaBanner,
} as Meta;

const Template: Story = () => <BetaBanner />;

export const Default = Template.bind({});
Default.args = {};
