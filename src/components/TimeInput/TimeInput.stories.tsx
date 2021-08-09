import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { TimeInput } from ".";

export default {
  title: "UI Elements/TimeInput",
  component: TimeInput,
} as Meta;

const Template: Story = () => (
  <div className='grid place-content-center h-screen'>
    <TimeInput onChange={action("On change")} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
