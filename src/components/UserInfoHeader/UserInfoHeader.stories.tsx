import { Story, Meta } from "@storybook/react";
import { UserInfoHeader, UserInfoHeaderPropType } from ".";

export default {
  title: "UI Elements/UserInfoHeader",
  component: UserInfoHeader,
} as Meta;

const Template: Story<UserInfoHeaderPropType> = args => (
  <UserInfoHeader {...args} />
);

export const MaximumInfos = Template.bind({});
MaximumInfos.args = {
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  description:
    "Louis XIV, also known as Louis the Great or the Sun King, was King of France from 14 May 1643 until his death in 1715.",
  link:
    "http://www.webanddata.com/suburl/login.aspx?url=http://mailflick.com/Home/Tools/tool?id=123",
  sensorsCount: 12,
  recordsCount: 11351256,
};

export const MinimalInfos = Template.bind({});
MinimalInfos.args = {
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  sensorsCount: 0,
  recordsCount: 0,
};
