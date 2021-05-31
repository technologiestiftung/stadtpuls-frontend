import { Story, Meta } from "@storybook/react";
import { TokenDisplay, TokenDisplayType } from ".";

export default {
  title: "UI Elements/TokenDisplay",
  component: TokenDisplay,
} as Meta;

const Template: Story<TokenDisplayType> = args => (
  <TokenDisplay {...args}></TokenDisplay>
);

export const IsGenerating = Template.bind({});

export const WithToken = Template.bind({});
WithToken.args = {
  token:
    "123456789123456789123456789123456789123456789123456789123456789123456789123456789",
};

export const Error = Template.bind({});
Error.args = {
  errorMessage: "Some error message",
};
