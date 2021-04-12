import { Story, Meta } from "@storybook/react";
import { HTMLProps } from "react";
import { Submit } from ".";

export default {
  title: "UI Elements/Submit",
  component: Submit,
} as Meta;

const SubmitTemplate: Story<HTMLProps<HTMLInputElement>> = ({
  children,
  disabled,
}) => (
  <Submit disabled={disabled}>
    {typeof children === "string" ? children : "Hello"}
  </Submit>
);

export const DefaultSubmit = SubmitTemplate.bind({});
DefaultSubmit.args = { disabled: false, children: "I am a submit" };

export const DisabledSubmit = SubmitTemplate.bind({});
DisabledSubmit.args = { disabled: true, children: "I am a disabled submit" };
