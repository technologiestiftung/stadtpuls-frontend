import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextLink } from ".";
import { HTMLProps } from "react";

export default {
  title: "UI Elements/TextLink",
  component: TextLink,
} as Meta;

const Template: Story<HTMLProps<HTMLAnchorElement>> = ({
  href,
  children,
  onClick,
}) => (
  <TextLink href={href} onClick={onClick}>
    {children}
  </TextLink>
);

export const Default = Template.bind({});
Default.args = {
  href: "#",
  children: "Hi! I'm a link",
  onClick: action("You clicked the link"),
};
