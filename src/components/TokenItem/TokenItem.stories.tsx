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
  description: "Default personal token",
  onRegenerate: action("onRegenerate function executed"),
  onInitiateDelete: action("onInitiateDelete function executed"),
};

export const LongName = Template.bind({});
LongName.args = {
  description:
    "Default personal token with an extraordinary long name that might span multiple rows",
  onRegenerate: action("onRegenerate function executed"),
  onInitiateDelete: action("onInitiateDelete function executed"),
};

export const LongDescriptionWithoutSpaces = Template.bind({});
LongDescriptionWithoutSpaces.args = {
  description:
    "Dlkdsjflkfsdnfjdnfjssdfsdfiuehwhuwfjbsmdbfsbuzuxghfhjbjchuhcuvuxcvxjhjxcgvxchvjnjhjhdhfsjkljajksdghjdshfbsdfbjsdfnkjhjdkfsjfjsdfsjfsb",
  onRegenerate: action("onRegenerate function executed"),
  onInitiateDelete: action("onInitiateDelete function executed"),
};

export const FirstItemInList = Template.bind({});
FirstItemInList.args = {
  description: "I am the first token with a border-top",
  isFirstItem: true,
  onRegenerate: action("onRegenerate function executed"),
  onInitiateDelete: action("onInitiateDelete function executed"),
};
