import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TokenForm, TokenFormType } from ".";

export default {
  title: "UI Elements/TokenForm",
  component: TokenForm,
} as Meta;

const Template: Story<TokenFormType> = args => <TokenForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: action("onSubmit function executed"),
};
