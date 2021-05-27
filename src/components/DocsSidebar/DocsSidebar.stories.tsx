import { Meta, Story } from "@storybook/react";
import { DocsSidebar } from ".";

export default {
  title: "Layout/DocsSidebar",
  component: DocsSidebar,
} as Meta;

const Template: Story = () => (
  <div className='grid grid-cols-12 bg-gray-50'>
    <DocsSidebar />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
