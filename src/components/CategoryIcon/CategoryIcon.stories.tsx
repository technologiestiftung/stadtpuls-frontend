import { Story, Meta } from "@storybook/react";
import { CategoryIcon } from ".";

export default {
  title: "UI Elements/CategoryIcon",
  component: CategoryIcon,
} as Meta;

const Template: Story = () => (
  <div className='inline-grid grid-cols-6 gap-4'>
    <CategoryIcon categoryId={1} />
    <CategoryIcon categoryId={2} />
    <CategoryIcon categoryId={3} />
    <CategoryIcon categoryId={4} />
    <CategoryIcon categoryId={5} />
    <CategoryIcon categoryId={6} />
  </div>
);

export const Default = Template.bind({});
Default.args = { symbol: 1 };
