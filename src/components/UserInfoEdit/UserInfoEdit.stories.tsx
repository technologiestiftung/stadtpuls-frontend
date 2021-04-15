import { Story, Meta } from "@storybook/react";
import { UserInfoEdit } from ".";

export default {
  title: "Forms/UserInfoEdit",
  component: UserInfoEdit,
} as Meta;

const Template: Story<{
  username: string;
  email: string;
}> = ({ username, email }) => (
  <UserInfoEdit username={username} email={email} />
);

export const DefaultUserInfoEdit = Template.bind({});
DefaultUserInfoEdit.args = {
  username: "ffthornton",
  email: "ffthornton5@yopmail.com",
};
