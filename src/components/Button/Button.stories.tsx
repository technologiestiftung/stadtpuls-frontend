import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Button } from ".";

export default {
  title: "UI Elements/Button",
  component: Button,
} as Meta;

const ButtonTemplate: Story<HTMLProps<HTMLButtonElement>> = ({
  children,
  disabled,
}) => <Button disabled={disabled}>{children || "Hello"}</Button>;

export const DefaultButton = ButtonTemplate.bind({});
DefaultButton.args = { disabled: false, children: "I am a button" };

export const DisabledButton = ButtonTemplate.bind({});
DisabledButton.args = { disabled: true, children: "I am a disabled button" };
