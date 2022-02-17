import { Meta, Story } from "@storybook/react";
import { DocsBottomNavigation } from ".";

export default {
  title: "Navigation/DocsBottomNavigation",
  component: DocsBottomNavigation,
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
