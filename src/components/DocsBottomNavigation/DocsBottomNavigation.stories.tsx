import { Meta, Story } from "@storybook/react";
import { withNextRouter } from "storybook-addon-next-router";
import { DocsBottomNavigation } from ".";

export default {
  title: "Navigation/DocsBottomNavigation",
  component: DocsBottomNavigation,
  decorators: [withNextRouter],
} as Meta;

const Template: Story = () => (
  <div className='container mx-auto'>
    <DocsBottomNavigation page='index' />
  </div>
);

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    pathname: "/docs",
  },
};
Default.args = {};
