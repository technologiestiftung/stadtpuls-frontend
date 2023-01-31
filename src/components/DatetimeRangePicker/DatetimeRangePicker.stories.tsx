import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { DatetimeRangePicker, DatetimeRangePickerPropType } from ".";

export default {
  title: "Forms/DatetimeRangePicker",
  component: DatetimeRangePicker,
} as Meta;

const Template: Story<DatetimeRangePickerPropType> = ({
  startDateTimeString,
  endDateTimeString,
  onDatetimeRangeChange,
}) => {
  const [currentDatetimeRange, setCurrentDatetimeRange] = useState<
    Omit<DatetimeRangePickerPropType, "onDatetimeRangeChange">
  >({
    startDateTimeString,
    endDateTimeString,
  });
  return (
    <div className='grid place-content-center h-screen'>
      <DatetimeRangePicker
        {...currentDatetimeRange}
        onDatetimeRangeChange={dateTimeRange => {
          setCurrentDatetimeRange({
            startDateTimeString:
              currentDatetimeRange.startDateTimeString ||
              new Date().toISOString(),
            endDateTimeString:
              currentDatetimeRange.endDateTimeString ||
              new Date().toISOString(),
          });
          onDatetimeRangeChange && onDatetimeRangeChange(dateTimeRange);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  startDateTimeString: "2021-08-11T13:13:12.000Z",
  endDateTimeString: "2021-08-01T19:19:43.000Z",
  onDatetimeRangeChange: action("Datetime range changed!"),
};
