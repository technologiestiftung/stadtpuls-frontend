import { FC } from "react";
import "react-day-picker/lib/style.css";
import { DayPickerInput } from "@components/DayPickerInput";
import { TimeInput } from "@components/TimeInput";
import moment from "moment";
import "moment/locale/de";

moment.locale("de-DE");

export interface DatetimeRangePickerPropType {
  startDateTimeString: string;
  endDateTimeString: string;
  tabIndex?: number;
  onDatetimeRangeChange: (vals: {
    startDateTimeString: string | undefined;
    endDateTimeString: string | undefined;
  }) => void;
}

const setDateDay = (date: moment.Moment, day: string): moment.Moment => {
  const [dayString, monthString, yearString] = day.split("/");
  return date
    .date(parseInt(dayString, 10))
    .month(parseInt(monthString, 10) - 1)
    .year(parseInt(yearString, 10));
};

const setDateTime = (date: moment.Moment, time: string): moment.Moment => {
  const [hourString, minuteString] = time.split(":");
  return date.hour(parseInt(hourString, 10)).minute(parseInt(minuteString, 10));
};

type GetModifiedTimeRangeSignature = (opts: {
  fromDate: moment.Moment;
  toDate: moment.Moment;
  tail: "start" | "end";
  val: Date | string;
  unit: "day" | "time";
}) => {
  startDateTimeString: string | undefined;
  endDateTimeString: string | undefined;
};

const getModifiedTimeRange: GetModifiedTimeRangeSignature = ({
  fromDate,
  toDate,
  tail,
  val,
  unit,
}) => {
  if (unit === "day") {
    const dayString = moment.parseZone(val).format("DD/MM/YYYY");
    return {
      startDateTimeString: (tail === "start"
        ? setDateDay(fromDate, dayString)
        : fromDate
      ).toISOString(),
      endDateTimeString: (tail === "end"
        ? setDateDay(toDate, dayString)
        : toDate
      ).toISOString(),
    };
  }
  const timeString = String(val);
  return {
    startDateTimeString: (tail === "start"
      ? setDateTime(fromDate, timeString)
      : fromDate
    ).toISOString(),
    endDateTimeString: (tail === "end"
      ? setDateTime(toDate, timeString)
      : toDate
    ).toISOString(),
  };
};

export const DatetimeRangePicker: FC<DatetimeRangePickerPropType> = ({
  startDateTimeString,
  endDateTimeString,
  onDatetimeRangeChange,
  tabIndex = 1,
}) => {
  const fromDate = moment.parseZone(startDateTimeString);
  const toDate = moment.parseZone(endDateTimeString);
  const modifiers = { start: fromDate.toDate(), end: toDate.toDate() };

  const handleDateChange = (
    tail: "start" | "end",
    val: Date | string,
    unit: "day" | "time"
  ): void => {
    onDatetimeRangeChange(
      getModifiedTimeRange({
        fromDate,
        toDate,
        tail,
        val,
        unit,
      })
    );
  };

  return (
    <div className='flex flex-wrap gap-2'>
      <div className='inline-flex'>
        <DayPickerInput
          value={fromDate.toDate()}
          nextElSelector='.InputTime-from'
          dayPickerProps={{
            selectedDays: [
              fromDate.toDate(),
              { from: fromDate.toDate(), to: toDate.toDate() },
            ],
            toMonth: toDate.toDate(),
            modifiers,
          }}
          onDayChange={val => {
            handleDateChange("start", val, "day");
          }}
          tabIndex={tabIndex}
        />
        <TimeInput
          className='InputTime-from'
          value={fromDate.format("HH:mm")}
          onChange={val => {
            handleDateChange("start", val, "time");
          }}
          tabIndex={tabIndex}
        />
      </div>
      <span className='inline-flex'>
        <DayPickerInput
          value={toDate.toDate()}
          nextElSelector='.InputTime-to'
          dayPickerProps={{
            selectedDays: [
              fromDate.toDate(),
              { from: fromDate.toDate(), to: toDate.toDate() },
            ],
            disabledDays: { before: fromDate.toDate() },
            modifiers,
            month: fromDate.toDate(),
            fromMonth: fromDate.toDate(),
          }}
          onDayChange={val => {
            handleDateChange("end", val, "day");
          }}
          tabIndex={tabIndex}
        />
        <TimeInput
          className='InputTime-to'
          value={toDate.format("HH:mm")}
          onChange={val => {
            handleDateChange("end", val, "time");
          }}
          tabIndex={tabIndex}
        />
      </span>
    </div>
  );
};
