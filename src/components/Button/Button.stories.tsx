import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Button } from ".";

export default {
  title: "UI Elements/Button",
  component: Button,
} as Meta;

interface ButtonTemplatePropTypes extends HTMLProps<HTMLButtonElement> {
  outline?: boolean;
  secondary?: boolean;
}

const ButtonTemplate: Story<ButtonTemplatePropTypes> = ({
  children,
  disabled,
  outline,
  secondary,
}) => (
  <Button outline={outline} disabled={disabled} secondary={secondary}>
    {children || "Hello"}
  </Button>
);

export const DefaultButton = ButtonTemplate.bind({});
DefaultButton.args = { disabled: false, children: "I am a button" };

export const DefaultOutlinedButton = ButtonTemplate.bind({});
DefaultOutlinedButton.args = {
  disabled: false,
  outline: true,
  children: "I am an outlined button",
};

export const SecondaryButton = ButtonTemplate.bind({});
SecondaryButton.args = {
  secondary: true,
  disabled: false,
  children: "I am a secondary button",
};

export const SecondaryOutlinedButton = ButtonTemplate.bind({});
SecondaryOutlinedButton.args = {
  secondary: true,
  disabled: false,
  outline: true,
  children: "I am a secondary outlined button",
};

export const DisabledButton = ButtonTemplate.bind({});
DisabledButton.args = { disabled: true, children: "I am a disabled button" };
