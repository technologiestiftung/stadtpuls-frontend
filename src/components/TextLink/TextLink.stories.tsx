import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextLink, ButtonTextLink } from ".";
import { HTMLProps } from "react";

export default {
  title: "UI Elements/TextLink",
  component: TextLink,
} as Meta;

const AnchorTemplate: Story<
  HTMLProps<HTMLAnchorElement> & {
    variant?: "dangerous" | "default";
  }
> = ({ href, children, onClick, variant }) => (
  <TextLink href={href} onClick={onClick} variant={variant}>
    {children}
  </TextLink>
);

export const AsAnchor = AnchorTemplate.bind({});
AsAnchor.args = {
  href: "#",
  children: "Hi! I'm an anchor looking like a link",
  onClick: action("You clicked the link"),
};

export const AsDangerousAnchor = AnchorTemplate.bind({});
AsDangerousAnchor.args = {
  href: "#",
  children: "Hi! I'm an anchor looking like a dangerous link",
  onClick: action("You clicked the dangerous link"),
  variant: "dangerous",
};

const ButtonTemplate: Story<
  HTMLProps<HTMLButtonElement> & {
    variant?: "dangerous" | "default";
  }
> = ({ href, children, onClick, variant }) => (
  <ButtonTextLink href={href} onClick={onClick} variant={variant}>
    {children}
  </ButtonTextLink>
);

export const AsButton = ButtonTemplate.bind({});
AsButton.args = {
  href: "#",
  children: "Hi! I'm a button looking like a link",
  onClick: action("You clicked the link"),
};

export const AsDangerousButton = ButtonTemplate.bind({});
AsDangerousButton.args = {
  href: "#",
  children: "Hi! I'm a button looking like a dangerous link",
  onClick: action("You clicked the dangerous link"),
  variant: "dangerous",
};
