import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TokenItem, TokenItemType } from ".";

export default {
  title: "UI Elements/TokenItem",
  component: TokenItem,
} as Meta;

const Template: Story<TokenItemType> = args => <TokenItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Default personal token",
  onRegenerate: action("onRegenerate function executed"),
  onInitiateDelete: action("onInitiateDelete function executed"),
};

export const LongName = Template.bind({});
LongName.args = {
  name:
    "Default personal token with an extraordinary long name that might span multiple rows",
  onRegenerate: action("onRegenerate function executed"),
  onInitiateDelete: action("onInitiateDelete function executed"),
};

export const FirstItemInList = Template.bind({});
FirstItemInList.args = {
  name: "I am the first token with a border-top",
  isFirstItem: true,
  onRegenerate: action("onRegenerate function executed"),
  onInitiateDelete: action("onInitiateDelete function executed"),
};
