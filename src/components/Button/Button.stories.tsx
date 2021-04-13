import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Button } from ".";

export default {
  title: "UI Elements/Button",
  component: Button,
} as Meta;

interface ButtonTemplatePropTypes extends HTMLProps<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dangerous" | "disabled";
}

const ButtonTemplate: Story<ButtonTemplatePropTypes> = ({
  children,
  variant,
}) => <Button variant={variant}>{children || "Hello"}</Button>;

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

export const DisabledButton = ButtonTemplate.bind({});
DisabledButton.args = {
  variant: "disabled",
  children: "I am a disabled button",
};
