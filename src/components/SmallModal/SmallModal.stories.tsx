import { Story, Meta } from "@storybook/react";
import { ReactNode } from "react";
import { SmallModal } from ".";

export default {
  title: "UI Elements/SmallModal",
  component: SmallModal,
} as Meta;

const Template: Story<{
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
}> = args => (
  <SmallModal title={args.title} footerContent={args.footerContent}>
    {args.children}
  </SmallModal>
);

export const WithoutFooterContent = Template.bind({});
WithoutFooterContent.args = {
  title: "I am a modal",
  children: <h1>{"I'm a child"}</h1>,
};

export const WithFooterContent = Template.bind({});
WithFooterContent.args = {
  title: "I am a modal",
  children: <h1>{"I'm a child"}</h1>,
  footerContent: <h1>{"I'm a footer content"}</h1>,
};
