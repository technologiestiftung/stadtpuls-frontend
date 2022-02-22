import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import {
  UserInfoHeader,
  UserInfoHeaderPropType,
} from "@components/UserInfoHeader";
import { UserInfoLoadingSkeleton } from ".";

export default {
  title: "UI Elements/UserInfoLoadingSkeleton",
  component: UserInfoLoadingSkeleton,
} as Meta;

const Template: Story<UserInfoHeaderPropType> = args => (
  <>
    <UserInfoHeader {...args} />
    <UserInfoLoadingSkeleton />
  </>
);

export const Default = Template.bind({});
Default.args = {
  displayName: "Louis Dieudonné de Bourbon",
  username: "looee14",
  description:
    "Louis XIV, also known as Louis the Great or the Sun King, was King of France from 14 May 1643 until his death in 1715.",
  link: "http://www.webanddata.com/suburl/login.aspx?url=http://mailflick.com/Home/Tools/tool?id=123",
  sensorsCount: 12342,
  recordsCount: 11351256,
  withEditButton: true,
  onEditButtonClick: action("Edit button clicked!"),
};
