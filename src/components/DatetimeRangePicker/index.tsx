import { useEffect, useState } from "react";
import { FC } from "react";
import "react-day-picker/lib/style.css";
import "moment/locale/de";
import { DayPickerInput } from "@components/DayPickerInput";
import { TimeInput } from "@components/TimeInput";
import moment from "react-day-picker/moment";

export interface DatetimeRangePickerPropType {
  startDatetimeString: string;
  endDatetimeString: string;
  tabIndex?: number;
  onDatetimeRangeChange: (vals: {
    startDatetimeString: string;
    endDatetimeString: string;
  }) => void;
}

const offset = new Date().getTimezoneOffset() / 60;
const hoursOffset = `${offset < 0 ? "-" : "+"}${pad(Math.abs(offset), 2)}:00`;

function pad(num: number, size: number): string {
  const s = `000${num}`;
  return s.substr(s.length - size);
}

export const DatetimeRangePicker: FC<DatetimeRangePickerPropType> = ({
  startDatetimeString,
  endDatetimeString,
  onDatetimeRangeChange,
  tabIndex = 1,
}) => {
  const startDatetime = new Date(startDatetimeString);
  const endDatetime = new Date(endDatetimeString);
  const [fromDate, setFromDate] = useState(startDatetime);
  const [toDate, setToDate] = useState(endDatetime);
  const [fromTime, setFromTime] = useState(
    moment.formatDate(startDatetime, "HH:mm")
  );
  const [toTime, setToTime] = useState(moment.formatDate(endDatetime, "HH:mm"));
  const modifiers = { start: fromDate, end: toDate };

  useEffect(() => {
    const fromDayString = moment.formatDate(fromDate, "YYYY-MM-DD");
    const toDayString = moment.formatDate(toDate, "YYYY-MM-DD");
    onDatetimeRangeChange({
      startDatetimeString: `${fromDayString}T${fromTime}:00.000${hoursOffset}`,
      endDatetimeString: `${toDayString}T${toTime}:00.000${hoursOffset}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, fromTime, toDate, toTime]);

  return (
    <div className='flex flex-wrap gap-2'>
      <div className='inline-flex'>
        <DayPickerInput
          value={fromDate}
          nextElSelector='.InputTime-from'
          dayPickerProps={{
            selectedDays: [fromDate, { from: fromDate, to: toDate }],
            toMonth: toDate,
            modifiers,
          }}
          onDayChange={val => {
            setFromDate(val);
            setToDate(val);
          }}
          tabIndex={tabIndex}
        />
        <TimeInput
          className='InputTime-from'
          value={fromTime}
          onChange={setFromTime}
          tabIndex={tabIndex}
        />
      </div>
      <span className='inline-flex'>
        <DayPickerInput
          value={toDate}
          nextElSelector='.InputTime-to'
          dayPickerProps={{
            selectedDays: [fromDate, { from: fromDate, to: toDate }],
            disabledDays: { before: fromDate },
            modifiers,
            month: fromDate,
            fromMonth: fromDate,
          }}
          onDayChange={val => setToDate(val)}
          tabIndex={tabIndex}
        />
        <TimeInput
          className='InputTime-to'
          value={toTime}
          onChange={setToTime}
          tabIndex={tabIndex}
        />
      </span>
    </div>
  );
};
