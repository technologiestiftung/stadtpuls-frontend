import { Story, Meta } from "@storybook/react";
import { ReactNode } from "react";
import { SignInUpFormWrapper } from ".";

export default {
  title: "Forms/SignInUpFormWrapper",
  component: SignInUpFormWrapper,
} as Meta;

const Template: Story<{
  type: "in" | "up";
  children: ReactNode;
}> = args => (
  <SignInUpFormWrapper type={args.type}>{args.children}</SignInUpFormWrapper>
);

export const Signin = Template.bind({});
Signin.args = {
  type: "in",
  children: <h1>{"I'm a signin form"}</h1>,
};

export const Signup = Template.bind({});
Signup.args = {
  type: "up",
  children: <h1>{"I'm a signup form"}</h1>,
};
