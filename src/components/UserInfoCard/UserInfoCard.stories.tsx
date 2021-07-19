import { Story, Meta } from "@storybook/react";
import { UserInfoCard } from ".";

export default {
  title: "UI Elements/UserInfoCard",
  component: UserInfoCard,
} as Meta;

const Template: Story<{
  username: string;
  email: string;
  registerDate: string;
}> = ({ username, email, registerDate }) => (
  <UserInfoCard username={username} email={email} registerDate={registerDate} />
);

export const DefaultUserInfoCard = Template.bind({});
DefaultUserInfoCard.args = {
  username: "ffthornton",
  email: "ffthornton5@yopmail.com",
  registerDate: "12. April 2021",
};
