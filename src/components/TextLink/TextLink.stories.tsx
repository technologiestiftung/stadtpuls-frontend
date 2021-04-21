import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextLink, TextLinkButton } from ".";
import { HTMLProps } from "react";

export default {
  title: "UI Elements/TextLink",
  component: TextLink,
} as Meta;

const AnchorTemplate: Story<HTMLProps<HTMLAnchorElement>> = ({
  href,
  children,
  onClick,
}) => (
  <TextLink href={href} onClick={onClick}>
    {children}
  </TextLink>
);

export const AsAnchor = AnchorTemplate.bind({});
AsAnchor.args = {
  href: "#",
  children: "Hi! I'm an anchor looking like a link",
  onClick: action("You clicked the link"),
};

const ButtonTemplate: Story<HTMLProps<HTMLButtonElement>> = ({
  href,
  children,
  onClick,
}) => (
  <TextLinkButton href={href} onClick={onClick}>
    {children}
  </TextLinkButton>
);

export const AsButton = ButtonTemplate.bind({});
AsButton.args = {
  href: "#",
  children: "Hi! I'm an button looking like a link",
  onClick: action("You clicked the link"),
};
