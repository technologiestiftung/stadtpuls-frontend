import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { DayPickerInput } from ".";

export default {
  title: "UI Elements/DayPickerInput",
  component: DayPickerInput,
} as Meta;

const Template: Story = () => (
  <div className='grid place-content-center h-screen'>
    <DayPickerInput
      value={new Date("2021-01-08T20:32:49.796Z")}
      onDayChange={action("Changed Day")}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
