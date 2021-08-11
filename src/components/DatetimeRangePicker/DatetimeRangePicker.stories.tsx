import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { DatetimeRangePicker, DatetimeRangePickerPropType } from ".";

export default {
  title: "Forms/DatetimeRangePicker",
  component: DatetimeRangePicker,
} as Meta;

const Template: Story<DatetimeRangePickerPropType> = ({
  startDatetimeString,
  endDatetimeString,
  onDatetimeRangeChange,
}) => {
  const [currentDatetimeRange, setCurrentDatetimeRange] = useState<
    Omit<DatetimeRangePickerPropType, "onDatetimeRangeChange">
  >({
    startDatetimeString,
    endDatetimeString,
  });
  return (
    <div className='grid place-content-center h-screen'>
      <DatetimeRangePicker
        {...currentDatetimeRange}
        onDatetimeRangeChange={dateTimeRange => {
          setCurrentDatetimeRange(dateTimeRange);
          onDatetimeRangeChange(dateTimeRange);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  startDatetimeString: "2021-08-11T13:13:12.000Z",
  endDatetimeString: "2021-08-01T19:19:43.000Z",
  onDatetimeRangeChange: action("Datetime range changed!"),
};
