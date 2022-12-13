import { Story, Meta } from "@storybook/react";
import { ShutdownModal } from ".";

export default {
  title: "UI Elements/ShutdownModal",
  component: ShutdownModal,
} as Meta;

const Template: Story = () => <ShutdownModal />;

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    pathname: "/accounts",
  },
};
Default.args = {};
