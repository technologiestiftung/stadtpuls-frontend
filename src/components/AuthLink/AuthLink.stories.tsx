import { Meta, Story } from "@storybook/react";
import { AuthLink } from ".";

export default {
  title: "UI Elements/AuthLink",
  component: AuthLink,
} as Meta;

const Template: Story<{ loggedInUserName: string }> = ({
  loggedInUserName,
}) => {
  return <AuthLink loggedInUserName={loggedInUserName} />;
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loggedInUserName: "JohnDoe",
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  loggedInUserName: undefined,
};
