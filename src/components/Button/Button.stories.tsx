import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Button } from ".";

export default {
  title: "UI Elements/Button",
  component: Button,
} as Meta;

interface ButtonTemplatePropTypes extends HTMLProps<HTMLButtonElement> {
  outline?: boolean;
}

const ButtonTemplate: Story<ButtonTemplatePropTypes> = ({
  children,
  disabled,
  outline,
}) => (
  <Button outline={outline} disabled={disabled}>
    {children || "Hello"}
  </Button>
);

export const DefaultButton = ButtonTemplate.bind({});
DefaultButton.args = { disabled: false, children: "I am a button" };

export const DisabledButton = ButtonTemplate.bind({});
DisabledButton.args = { disabled: true, children: "I am a disabled button" };

export const OutlinedButton = ButtonTemplate.bind({});
OutlinedButton.args = {
  disabled: false,
  outline: true,
  children: "I am an outlined button",
};
