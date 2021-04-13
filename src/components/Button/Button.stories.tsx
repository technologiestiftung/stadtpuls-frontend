import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Button } from ".";

export default {
  title: "UI Elements/Button",
  component: Button,
} as Meta;

interface ButtonTemplatePropTypes extends HTMLProps<HTMLButtonElement> {
  secondary?: boolean;
  warning?: boolean;
}

const ButtonTemplate: Story<ButtonTemplatePropTypes> = ({
  children,
  disabled,
  warning,
  secondary,
}) => (
  <Button warning={warning} disabled={disabled} secondary={secondary}>
    {children || "Hello"}
  </Button>
);

export const DefaultButton = ButtonTemplate.bind({});
DefaultButton.args = { disabled: false, children: "I am a button" };

export const SecondaryButton = ButtonTemplate.bind({});
SecondaryButton.args = {
  secondary: true,
  children: "I am a secondary button",
};

export const WarningButton = ButtonTemplate.bind({});
WarningButton.args = {
  warning: true,
  children: "I am a warning button",
};

export const DisabledButton = ButtonTemplate.bind({});
DisabledButton.args = { disabled: true, children: "I am a disabled button" };
