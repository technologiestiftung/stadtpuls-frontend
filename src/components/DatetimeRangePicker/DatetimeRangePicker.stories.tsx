import { Meta, Story } from "@storybook/react";
import { DatetimeRangePicker } from ".";

export default {
  title: "UI Elements/DatetimeRangePicker",
  component: DatetimeRangePicker,
} as Meta;

const Template: Story = () => (
  <div className='grid place-content-center h-screen'>
    <DatetimeRangePicker />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
