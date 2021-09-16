import { Meta, Story } from "@storybook/react";
import ProjectIcon from "@material-ui/icons/FormatListBulleted";
import AccountIcon from "@material-ui/icons/AccountCircle";
import LogoutIconn from "@material-ui/icons/ExitToApp";
import { ReactNode } from "react";
import { TextLink } from "@components/TextLink";
import { DropdownMenu, DropdownMenuPropType } from ".";
import { action } from "@storybook/addon-actions";

const iconProps = {
  className: "transition mr-2 text-gray-400 group-hover:text-purple",
};

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

export const WithDisabledItem = Template.bind({});
WithDisabledItem.args = {
  items: [
    { id: 1, title: "Meine Projekte", href: "/projects" },
    { id: 2, title: "Account", href: "/account", disabled: true },
    { id: 3, title: "Logout", onClick: action("logged out!"), disabled: true },
  ],
  children: <TextLink>Click me</TextLink>,
};

export const WithCustomChildren = Template.bind({});
WithCustomChildren.args = {
  items: [
    {
      id: 0,
      title: (
        <>
          <ProjectIcon {...iconProps} /> Meine Projekte
        </>
      ),
      href: "/account/projects",
    },
    {
      id: 2,
      title: (
        <>
          <AccountIcon {...iconProps} /> Account
        </>
      ),
      href: "/account/profile",
    },
    {
      id: 3,
      title: (
        <>
          <LogoutIconn {...iconProps} /> Abmelden
        </>
      ),
      onClick: action("logged out!"),
    },
  ],
  children: <TextLink>Click me</TextLink>,
};
