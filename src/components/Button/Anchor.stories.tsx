import { Story, Meta } from "@storybook/react";
import { AnchorButton, AnchorButtonPropType } from ".";

export default {
  title: "UI Elements/AnchorButton",
  component: AnchorButton,
} as Meta;

const AnchorTemplate: Story<AnchorButtonPropType> = ({
  children,
  variant,
  href = "/",
}) => (
  <AnchorButton variant={variant} href={href}>
    {children}
  </AnchorButton>
);

export const DefaultAnchorButton = AnchorTemplate.bind({});
DefaultAnchorButton.args = {
  children: "Anchor button (looking like a button)",
};

export const PrimaryAnchor = AnchorTemplate.bind({});
PrimaryAnchor.args = {
  variant: "primary",
  children: "Anchor button (looking like a primary button)",
};

export const DangerousAnchorButton = AnchorTemplate.bind({});
DangerousAnchorButton.args = {
  variant: "dangerous",
  children: "Anchor button (looking like a dangerous button)",
};
