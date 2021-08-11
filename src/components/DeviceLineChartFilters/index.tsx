import { DatetimeRangePicker } from "@components/DatetimeRangePicker";
import { FormSelect } from "@components/FormSelect";
import { RadioFieldset } from "@components/RadioFieldset";
import { FC } from "react";

type FilterType = "devicesByAmount" | "devicesByDatetimeRange";
type TemporalityOfRecordsType = "newest" | "oldest";

export interface DeviceLineChartFiltersPropType {
  activeFilterType: FilterType;
  onActiveFilterTypeChange: (filterType: FilterType) => void;
  temporalityOfRecords: "newest" | "oldest";
  onTemporalityOfRecordsChange: (temp: TemporalityOfRecordsType) => void;
  numberOfRecordsToDisplay: number;
  onNumberOfRecordsChange: (num: number) => void;
  maxNumberOfRecordsToDisplay: number;
  startDatetimeString: string;
  endDatetimeString: string;
  onDatetimeRangeChange: (vals: {
    startDatetimeString: string;
    endDatetimeString: string;
  }) => void;
}

export const DeviceLineChartFilters: FC<DeviceLineChartFiltersPropType> = ({
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
}) => (
  <div className='border-b border-gray-100 shadow p-4 grid grid-cols-[auto,max-content] gap-8'>
    <RadioFieldset
      isSelected={activeFilterType === "devicesByAmount"}
      label='Beiträge bei Anzahl'
      name='devicesByAmount'
      onSelect={() => onActiveFilterTypeChange("devicesByAmount")}
    >
      <div className='grid grid-cols-[2fr,1fr] gap-2'>
        <FormSelect
          name='newestOrOldest'
          options={[
            { name: "Neueste", value: "newest" },
            { name: "Älteste", value: "oldest" },
          ]}
          defaultValue={temporalityOfRecords}
          onValueChange={temp =>
            onTemporalityOfRecordsChange(temp as TemporalityOfRecordsType)
          }
          tabIndex={activeFilterType === "devicesByAmount" ? 0 : -1}
        />
        <input
          type='number'
          name='records-amount'
          value={numberOfRecordsToDisplay}
          min='1'
          max={`${maxNumberOfRecordsToDisplay}`}
          step='1'
          id='records-amount'
          className='text-blue font-bold text-xs'
          onChange={event =>
            onNumberOfRecordsChange(parseInt(event.target.value, 10))
          }
          tabIndex={activeFilterType === "devicesByAmount" ? 0 : -1}
        />
      </div>
    </RadioFieldset>
    <RadioFieldset
      isSelected={activeFilterType === "devicesByDatetimeRange"}
      label='Beiträge bei Zeitspanne'
      name='devicesByDatetimeRange'
      onSelect={() => onActiveFilterTypeChange("devicesByDatetimeRange")}
    >
      <DatetimeRangePicker
        startDatetimeString={startDatetimeString}
        endDatetimeString={endDatetimeString}
        onDatetimeRangeChange={onDatetimeRangeChange}
        tabIndex={activeFilterType === "devicesByDatetimeRange" ? 0 : -1}
      />
    </RadioFieldset>
  </div>
);
