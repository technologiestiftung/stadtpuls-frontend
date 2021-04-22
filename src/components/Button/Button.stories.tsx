import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Button, ButtonVariantsType } from ".";

export default {
  title: "UI Elements/Button",
  component: Button,
} as Meta;

interface ButtonTemplatePropTypes extends HTMLProps<HTMLButtonElement> {
  disabled?: boolean;
  variant?: ButtonVariantsType;
}

const ButtonTemplate: Story<ButtonTemplatePropTypes> = ({
  children,
  variant,
  disabled,
}) => (
  <Button variant={variant} disabled={disabled}>
    {children}
  </Button>
);

export const DefaultButton = ButtonTemplate.bind({});
DefaultButton.args = { children: "I am a button" };

export const PrimaryButton = ButtonTemplate.bind({});
PrimaryButton.args = {
  variant: "primary",
  children: "I am a primary button",
};

export const DangerousButton = ButtonTemplate.bind({});
DangerousButton.args = {
  variant: "dangerous",
  children: "I am a dangerous button",
};

export const DefaultDisabledButton = ButtonTemplate.bind({});
DefaultDisabledButton.args = {
  disabled: true,
  children: "I am a default disabled button",
};

export const PrimaryDisabledButton = ButtonTemplate.bind({});
PrimaryDisabledButton.args = {
  disabled: true,
  variant: "primary",
  children: "I am a primary disabled button",
};

export const DangerousDisabledButton = ButtonTemplate.bind({});
DangerousDisabledButton.args = {
  disabled: true,
  variant: "dangerous",
  children: "I am a dangerous disabled button",
};
