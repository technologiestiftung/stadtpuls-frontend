import { TextLink } from "@components/TextLink";
import { Meta, Story } from "@storybook/react";
import { withNextRouter } from "storybook-addon-next-router";
import { ActiveLink } from ".";

export default {
  title: "UI Elements/ActiveLink",
  component: ActiveLink,
  decorators: [withNextRouter],
} as Meta;

const Template: Story<{
  activeClassName: string;
}> = ({ activeClassName }) => (
  <>
    <p>
      <ActiveLink activeClassName={activeClassName} href='/a'>
        <TextLink href='/a'>Active Link</TextLink>
      </ActiveLink>
    </p>
    <p>
      <ActiveLink activeClassName={activeClassName} href='/b'>
        <TextLink href='/b'>Non active Link</TextLink>
      </ActiveLink>
    </p>
  </>
);

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    asPath: "/a",
  },
};
Default.args = {
  activeClassName: "no-underline font-bold hover:opacity-100",
};
