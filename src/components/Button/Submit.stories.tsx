import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Submit } from ".";

export default {
  title: "UI Elements/Submit",
  component: Submit,
} as Meta;

interface SubmitTemplatePropTypes extends HTMLProps<HTMLInputElement> {
  disabled?: boolean;
  variant?: "primary" | "secondary" | "dangerous";
}

const SubmitTemplate: Story<SubmitTemplatePropTypes> = ({
  children,
  variant,
  disabled,
}) => (
  <Submit variant={variant} disabled={disabled}>
    {typeof children === "string" ? children : "Hello"}
  </Submit>
);

export const DefaultSubmit = SubmitTemplate.bind({});
DefaultSubmit.args = { children: "I am a submit" };

export const PrimarySubmit = SubmitTemplate.bind({});
PrimarySubmit.args = { variant: "primary", children: "I am a primary submit" };

export const DangerousSubmit = SubmitTemplate.bind({});
DangerousSubmit.args = {
  variant: "dangerous",
  children: "I am a dangerous submit",
};

export const DisabledSubmit = SubmitTemplate.bind({});
DisabledSubmit.args = {
  disabled: true,
  children: "I am a disabled submit",
};
