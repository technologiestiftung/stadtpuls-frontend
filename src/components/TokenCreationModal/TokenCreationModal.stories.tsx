import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TokenCreationModal, TokenCreationModalPropType } from ".";

export default {
  title: "UI Elements/TokenCreationModal",
  component: TokenCreationModal,
} as Meta;

const Template: Story<TokenCreationModalPropType> = args => (
  <TokenCreationModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tokenDescription: "My first token",
  token:
    "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
  onClose: action("onClose function executed"),
};
