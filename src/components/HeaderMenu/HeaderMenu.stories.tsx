import { Story, Meta } from "@storybook/react";
import { HeaderMenu } from ".";

export default {
  title: "Navigation/HeaderMenu",
  component: HeaderMenu,
} as Meta;

const Template: Story = () => <HeaderMenu />;

export const Default = Template.bind({});
Default.args = {};
