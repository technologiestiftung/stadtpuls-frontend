import { Story, Meta } from "@storybook/react";
import { Anchor, AnchorPropType } from ".";

export default {
  title: "UI Elements/Anchor",
  component: Anchor,
} as Meta;

const AnchorTemplate: Story<AnchorPropType> = ({
  children,
  variant,
  href = "/",
}) => (
  <Anchor variant={variant} href={href}>
    {typeof children === "string" ? children : "Default anchor text"}
  </Anchor>
);

export const DefaultAnchor = AnchorTemplate.bind({});
DefaultAnchor.args = { children: "Anchor (looking like a button)" };

export const PrimaryAnchor = AnchorTemplate.bind({});
PrimaryAnchor.args = {
  variant: "primary",
  children: "Anchor (looking like a primary button)",
};

export const TextAnchor = AnchorTemplate.bind({});
TextAnchor.args = {
  variant: "text",
  children: "Anchor (looking traditionally underlined)",
};
