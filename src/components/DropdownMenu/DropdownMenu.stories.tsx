import { Meta, Story } from "@storybook/react";
import { ReactNode } from "react";
import { TextLink } from "@components/TextLink";
import { DropdownMenu, DropdownMenuPropType } from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "UI Elements/DropdownMenu",
  component: DropdownMenu,
} as Meta;

const Template: Story<
  DropdownMenuPropType & {
    children: ReactNode;
  }
> = ({ items, children }) => (
  <DropdownMenu items={items}>{children}</DropdownMenu>
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: 1, title: "Meine Projekte", href: "/projects" },
    { id: 2, title: "Account", href: "/account" },
    { id: 3, title: "Logout", onClick: action("logged out!") },
  ],
  children: <TextLink>Click me</TextLink>,
};
