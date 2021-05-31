import { Story, Meta } from "@storybook/react";
import { TokenDisplay, TokenDisplayType } from ".";

export default {
  title: "UI Elements/TokenDisplay",
  component: TokenDisplay,
} as Meta;

const Template: Story<TokenDisplayType> = args => (
  <TokenDisplay {...args}>{args.children}</TokenDisplay>
);

export const Default = Template.bind({});

export const IsGenerating = Template.bind({});
IsGenerating.args = {
  children: "Token wird generiert...",
};

export const WithToken = Template.bind({});
WithToken.args = {
  children:
    "123456789123456789123456789123456789123456789123456789123456789123456789123456789",
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
  children: "This could be a custom error message",
};
