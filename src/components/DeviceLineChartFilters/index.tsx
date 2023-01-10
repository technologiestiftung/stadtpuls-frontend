import { DatetimeRangePicker } from "@components/DatetimeRangePicker";
import { RadioFieldset } from "@components/RadioFieldset";
import moment from "moment";
import "moment/locale/de";
import { FC, useState } from "react";

moment.locale("de-DE");

type FilterType = "devicesByTimespan" | "devicesByDatetimeRange";
type TimespanType = "last24h" | "last7days" | "last30days" | "max";

export interface DatetimeRangeType {
  startDateTimeString: string | undefined;
  endDateTimeString: string | undefined;
}

export interface DeviceLineChartFiltersPropType extends DatetimeRangeType {
  onDatetimeRangeChange: (vals: DatetimeRangeType) => void;
  today?: moment.Moment;
}

interface GetTimeRangeByFiltersReturnType {
  startDateTimeString: string | undefined;
  endDateTimeString: string | undefined;
}

const getTimeRangeByTimespan = (
  timespan: TimespanType,
  today: moment.Moment
): GetTimeRangeByFiltersReturnType => {
  switch (timespan) {
    case "last24h":
      return {
        startDateTimeString: moment
          .parseZone(today)
          .subtract(1, "days")
          .toISOString(),
        endDateTimeString: today.toISOString(),
      };
    case "last7days":
      return {
        startDateTimeString: moment
          .parseZone(today)
          .subtract(7, "days")
          .toISOString(),
        endDateTimeString: today.toISOString(),
      };
    case "last30days":
      return {
        startDateTimeString: moment
          .parseZone(today)
          .subtract(30, "days")
          .toISOString(),
        endDateTimeString: today.toISOString(),
      };
    default:
      return {
        startDateTimeString: undefined,
        endDateTimeString: undefined,
      };
  }
};

interface TemporalityButtonPropType {
  isActive?: boolean;
  isFirst?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const TemporalityButton: FC<TemporalityButtonPropType> = ({
  isActive = false,
  isFirst = false,
  onClick,
  disabled = false,
  children,
}) => (
  <button
    className={[
      "border border-gray-200 px-2 sm:px-3 py-2 text-sm relative transition",
      "focus:outline-none focus:ring-2 focus:border-purple focus:ring-purple focus:z-30",
      "focus:ring-offset focus:ring-offset-white focus:ring-offset-2",
      !isActive &&
        !disabled &&
        "hover:bg-purple hover:bg-opacity-10 hover:text-purple hover:border-purple hover:z-10",
      !isFirst && "ml-[-1px]",
      isActive && "bg-blue border-blue text-white z-20",
      disabled && "cursor-not-allowed",
    ]
      .filter(Boolean)
      .join(" ")}
    onClick={evt => {
      evt.preventDefault();
      evt.stopPropagation();
      onClick();
    }}
    disabled={disabled}
  >
    {children}
  </button>
);

export const DeviceLineChartFilters: FC<DeviceLineChartFiltersPropType> = ({
  startDateTimeString,
  endDateTimeString,
  onDatetimeRangeChange,
  today = moment.parseZone(Date.now()),
}) => {
  const [activeFilterType, setActiveFilterType] =
    useState<FilterType>("devicesByTimespan");
  const [temporalityOfRecords, setTemporaityOfRecords] =
    useState<TimespanType>("max");
  const last7daysTimeRange = getTimeRangeByTimespan("last7days", today);
  return (
    <div className='pb-4 pt-8 flex flex-wrap gap-8'>
      <RadioFieldset
        isSelected={activeFilterType === "devicesByDatetimeRange"}
        label='Messwerte nach Zeitspanne'
        name='devicesByDatetimeRange'
        disabled={true}
      >
        <DatetimeRangePicker
          startDateTimeString={
            startDateTimeString ||
            last7daysTimeRange.startDateTimeString ||
            moment.parseZone().toISOString()
          }
          endDateTimeString={
            endDateTimeString ||
            last7daysTimeRange.endDateTimeString ||
            moment.parseZone().toISOString()
          }
          tabIndex={activeFilterType === "devicesByDatetimeRange" ? 0 : -1}
        />
      </RadioFieldset>
      <RadioFieldset
        isSelected={activeFilterType === "devicesByTimespan"}
        label='Messwerte nach Zeitraum'
        name='devicesByTimespan'
        disabled={true}
      >
        <div className='flex'>
          <TemporalityButton
            isActive={
              activeFilterType === "devicesByTimespan" &&
              temporalityOfRecords === "last24h"
            }
            isFirst
            onClick={() => {
              setActiveFilterType("devicesByTimespan");
              setTemporaityOfRecords("last24h");
              onDatetimeRangeChange(getTimeRangeByTimespan("last24h", today));
            }}
            disabled={true}
          >
            24 Std.
          </TemporalityButton>
          <TemporalityButton
            isActive={
              activeFilterType === "devicesByTimespan" &&
              temporalityOfRecords === "last7days"
            }
            onClick={() => {
              setActiveFilterType("devicesByTimespan");
              setTemporaityOfRecords("last7days");
              onDatetimeRangeChange(getTimeRangeByTimespan("last7days", today));
            }}
            disabled={true}
          >
            7 Tage
          </TemporalityButton>
          <TemporalityButton
            isActive={
              activeFilterType === "devicesByTimespan" &&
              temporalityOfRecords === "last30days"
            }
            onClick={() => {
              setActiveFilterType("devicesByTimespan");
              setTemporaityOfRecords("last30days");
              onDatetimeRangeChange(
                getTimeRangeByTimespan("last30days", today)
              );
            }}
            disabled={true}
          >
            30 Tage
          </TemporalityButton>
          <TemporalityButton
            isActive={
              activeFilterType === "devicesByTimespan" &&
              temporalityOfRecords === "max"
            }
            onClick={() => {
              setActiveFilterType("devicesByTimespan");
              setTemporaityOfRecords("max");
              onDatetimeRangeChange(getTimeRangeByTimespan("max", today));
            }}
            disabled={true}
          >
            Max.
          </TemporalityButton>
        </div>
      </RadioFieldset>
    </div>
  );
};
