import { Story, Meta } from "@storybook/react";
import { MagicLinkModal, MagicLinkModalPropType } from ".";

export default {
  title: "Map/MagicLinkModal",
  component: MagicLinkModal,
} as Meta;

const Template: Story<MagicLinkModalPropType> = args => (
  <MagicLinkModal {...args} />
);

export const Loading = Template.bind({});
Loading.args = { isLoading: true, email: "contact@example.com" };

export const Sent = Template.bind({});
Sent.args = { isLoading: false, email: "contact@example.com" };
