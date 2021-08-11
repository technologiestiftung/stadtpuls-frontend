import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { DeviceLineChartFilters, DeviceLineChartFiltersPropType } from ".";

export default {
  title: "Forms/DeviceLineChartFilters",
  component: DeviceLineChartFilters,
} as Meta;

const Template: Story<DeviceLineChartFiltersPropType> = ({
  activeFilterType,
  onActiveFilterTypeChange,
  temporalityOfRecords,
  onTemporalityOfRecordsChange,
  numberOfRecordsToDisplay,
  onNumberOfRecordsChange,
  maxNumberOfRecordsToDisplay,
  startDatetimeString,
  endDatetimeString,
  onDatetimeRangeChange,
}) => {
  const [internalActiveFilterType, setActiveFilterType] = useState<
    DeviceLineChartFiltersPropType["activeFilterType"]
  >(activeFilterType);
  const [
    internalNumberOfRecordsToDisplay,
    setInternalNumberOfRecordsToDisplay,
  ] = useState<DeviceLineChartFiltersPropType["numberOfRecordsToDisplay"]>(
    numberOfRecordsToDisplay
  );
  const [
    internalTemporalityOfRecords,
    setInternalTemporaityOfRecords,
  ] = useState<DeviceLineChartFiltersPropType["temporalityOfRecords"]>(
    temporalityOfRecords
  );
  const [currentDatetimeRange, setCurrentDatetimeRange] = useState<
    Pick<
      DeviceLineChartFiltersPropType,
      "startDatetimeString" | "endDatetimeString"
    >
  >({
    startDatetimeString,
    endDatetimeString,
  });
  return (
    <div className='grid place-content-center h-screen'>
      <DeviceLineChartFilters
        activeFilterType={internalActiveFilterType}
        onActiveFilterTypeChange={filter => {
          setActiveFilterType(filter);
          onActiveFilterTypeChange(filter);
        }}
        temporalityOfRecords={internalTemporalityOfRecords}
        onTemporalityOfRecordsChange={temp => {
          setInternalTemporaityOfRecords(temp);
          onTemporalityOfRecordsChange(temp);
        }}
        numberOfRecordsToDisplay={internalNumberOfRecordsToDisplay}
        onNumberOfRecordsChange={num => {
          setInternalNumberOfRecordsToDisplay(num);
          onNumberOfRecordsChange(num);
        }}
        maxNumberOfRecordsToDisplay={maxNumberOfRecordsToDisplay}
        startDatetimeString={currentDatetimeRange.startDatetimeString}
        endDatetimeString={currentDatetimeRange.endDatetimeString}
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
  activeFilterType: "devicesByAmount" as const,
  temporalityOfRecords: "newest" as const,
  onTemporalityOfRecordsChange: action("onTemporalityOfRecordsChange"),
  numberOfRecordsToDisplay: 500,
  onNumberOfRecordsChange: action("onNumberOfRecordsChange"),
  maxNumberOfRecordsToDisplay: 1000,
  startDatetimeString: "2021-08-11T13:13:12.000Z",
  endDatetimeString: "2021-08-01T19:19:43.000Z",
  onDatetimeRangeChange: action("onDatetimeRangeChange"),
};
