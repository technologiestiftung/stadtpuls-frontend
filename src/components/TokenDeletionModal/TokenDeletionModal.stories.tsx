import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TokenDeletionModal, TokenDeletionModalPropType } from ".";

export default {
  title: "UI Elements/TokenDeletionModal",
  component: TokenDeletionModal,
} as Meta;

const Template: Story<TokenDeletionModalPropType> = args => (
  <TokenDeletionModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tokenDescription: "My mistakenly generated token",
  onDelete: action("onDelete function executed"),
  onCancel: action("onCancel function executed"),
};
