import { DatetimeRangePicker } from "@components/DatetimeRangePicker";
import { RadioFieldset } from "@components/RadioFieldset";
import { FC } from "react";

type FilterType = "devicesByTimespan" | "devicesByDatetimeRange";
type TemporalityOfRecordsType = "today" | "week" | "month" | "all";

export interface DeviceLineChartFiltersPropType {
  activeFilterType: FilterType;
  onActiveFilterTypeChange: (filterType: FilterType) => void;
  temporalityOfRecords: TemporalityOfRecordsType;
  onTemporalityOfRecordsChange: (temp: TemporalityOfRecordsType) => void;
  startDatetimeString: string;
  endDatetimeString: string;
  onDatetimeRangeChange: (vals: {
    startDatetimeString: string;
    endDatetimeString: string;
  }) => void;
}

interface TemporalityButtonPropType {
  isActive?: boolean;
  isFirst?: boolean;
  onClick?: () => void;
}

const TemporalityButton: FC<TemporalityButtonPropType> = ({
  isActive = false,
  isFirst = false,
  onClick = () => undefined,
  children,
}) => (
  <button
    className={[
      "border border-gray-200 px-4 py-2 text-sm relative transition",
      "focus:outline-none focus:ring-2 focus:border-purple focus:ring-purple focus:z-30",
      "focus:ring-offset focus:ring-offset-white focus:ring-offset-2",
      !isActive &&
        "hover:bg-purple hover:bg-opacity-10 hover:text-purple hover:border-purple hover:z-10",
      !isFirst && "ml-[-1px]",
      isActive && "bg-blue border-blue text-white z-20",
    ]
      .filter(Boolean)
      .join(" ")}
    onClick={evt => {
      evt.preventDefault();
      onClick();
    }}
  >
    {children}
  </button>
);

export const DeviceLineChartFilters: FC<DeviceLineChartFiltersPropType> = ({
  activeFilterType,
  onActiveFilterTypeChange,
  temporalityOfRecords,
  onTemporalityOfRecordsChange,
  startDatetimeString,
  endDatetimeString,
  onDatetimeRangeChange,
}) => (
  <div className='border-b border-gray-100 shadow p-4 flex flex-wrap gap-8'>
    <RadioFieldset
      isSelected={activeFilterType === "devicesByTimespan"}
      label='Messwerte bei Zeitraum'
      name='devicesByTimespan'
      onSelect={() => onActiveFilterTypeChange("devicesByTimespan")}
    >
      <div className='flex'>
        <TemporalityButton
          isActive={temporalityOfRecords === "today"}
          isFirst
          onClick={() => onTemporalityOfRecordsChange("today")}
        >
          Heute
        </TemporalityButton>
        <TemporalityButton
          isActive={temporalityOfRecords === "week"}
          onClick={() => onTemporalityOfRecordsChange("week")}
        >
          Woche
        </TemporalityButton>
        <TemporalityButton
          isActive={temporalityOfRecords === "month"}
          onClick={() => onTemporalityOfRecordsChange("month")}
        >
          Monat
        </TemporalityButton>
        <TemporalityButton
          isActive={temporalityOfRecords === "all"}
          onClick={() => onTemporalityOfRecordsChange("all")}
        >
          Alle
        </TemporalityButton>
      </div>
    </RadioFieldset>
    <RadioFieldset
      isSelected={activeFilterType === "devicesByDatetimeRange"}
      label='Messwerte bei Zeitspanne'
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
