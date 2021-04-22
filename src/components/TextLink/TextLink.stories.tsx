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
    variant?: "dangerous" | "primary" | "secondary";
  }
> = ({ href, children, onClick, variant }) => (
  <TextLink href={href} onClick={onClick} variant={variant}>
    {children}
  </TextLink>
);

export const AsPrimaryAnchor = AnchorTemplate.bind({});
AsPrimaryAnchor.args = {
  href: "#",
  children: "Hi! I'm an anchor looking like a primary link",
  onClick: action("You clicked the link"),
};

export const AsSecondaryAnchor = AnchorTemplate.bind({});
AsSecondaryAnchor.args = {
  href: "#",
  children: "Hi! I'm an anchor looking like a secondary link",
  onClick: action("You clicked the link"),
  variant: "secondary",
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
    variant?: "dangerous" | "primary" | "secondary";
  }
> = ({ href, children, onClick, variant }) => (
  <ButtonTextLink href={href} onClick={onClick} variant={variant}>
    {children}
  </ButtonTextLink>
);

export const AsPrimaryButton = ButtonTemplate.bind({});
AsPrimaryButton.args = {
  href: "#",
  children: "Hi! I'm a button looking like a primary link",
  onClick: action("You clicked the link"),
};

export const AsSecondaryButton = ButtonTemplate.bind({});
AsSecondaryButton.args = {
  href: "#",
  children: "Hi! I'm a button looking like a primary link",
  onClick: action("You clicked the link"),
  variant: "secondary",
};

export const AsDangerousButton = ButtonTemplate.bind({});
AsDangerousButton.args = {
  href: "#",
  children: "Hi! I'm a button looking like a dangerous link",
  onClick: action("You clicked the dangerous link"),
  variant: "dangerous",
};
