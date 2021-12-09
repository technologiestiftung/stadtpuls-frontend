import { Story, Meta } from "@storybook/react";
import { UserAvatar } from ".";

export default {
  title: "UI Elements/UserAvatar",
  component: UserAvatar,
} as Meta;

const Template: Story<{
  username: string;
  size?: number;
  className?: string;
}> = ({ username, size, className }) => (
  <UserAvatar username={username.trim()} size={size} className={className} />
);

export const DefaultUserAvatar = Template.bind({});
DefaultUserAvatar.args = {
  username: "ffthornton",
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  username: "Dennis",
  size: 48,
};

export const WithCustomClassName = Template.bind({});
WithCustomClassName.args = {
  username: "Fabian",
  className: "animate-spin",
};
