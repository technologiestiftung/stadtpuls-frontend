import { Story, Meta } from "@storybook/react";
import { ShutdownBanner } from ".";

export default {
  title: "UI Elements/ShutdownBanner",
  component: ShutdownBanner,
} as Meta;

const Template: Story = () => <ShutdownBanner />;

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    pathname: "/accounts",
  },
};
Default.args = {};
