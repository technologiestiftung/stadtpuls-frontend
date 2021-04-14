import { Meta, Story } from "@storybook/react";
import { ReactNode } from "react";
import { AuthLink, ColouredAuthLink } from ".";

export default {
  title: "UI Elements/AuthLink",
  component: AuthLink,
} as Meta;

const Template: Story<{
  variant: "primary" | "secondary";
  children: ReactNode;
}> = ({ variant, children }) => (
  <ColouredAuthLink variant={variant} href='/'>
    {children}
  </ColouredAuthLink>
);

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  variant: "secondary",
  children: "Anmeldung",
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  variant: "primary",
  children: "contact@example.com",
};
