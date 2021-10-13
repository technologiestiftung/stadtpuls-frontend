import { Story, Meta } from "@storybook/react";
import { NotFoundPage } from ".";

export default {
  title: "Pages/NotFoundPage",
  component: NotFoundPage,
} as Meta;

const Template: Story = args => <NotFoundPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
