import { Story, Meta } from "@storybook/react";
import { ReactNode } from "react";
import { SmallModalOverlay } from ".";

export default {
  title: "UI Elements/SmallModalOverlay",
  component: SmallModalOverlay,
} as Meta;

const Template: Story<{
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
  variant?: "dangerous" | "primary";
}> = args => (
  <SmallModalOverlay
    title={args.title}
    footerContent={args.footerContent}
    variant={args.variant}
  >
    {args.children}
  </SmallModalOverlay>
);

export const WithoutFooterContent = Template.bind({});
WithoutFooterContent.args = {
  title: "Gehe zu deinen E-Mails",
  children: (
    <p>
      Wir haben dir eine E-Mail mir einem Anmeldungs-Link geschickt. Klicke den
      Link an, um dich einzuloggen.
    </p>
  ),
};
