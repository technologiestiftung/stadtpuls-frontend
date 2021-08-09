import { useState } from "react";
import { FC } from "react";
import "react-day-picker/lib/style.css";
import "moment/locale/de";
import { DayPickerInput } from "@components/DayPickerInput";
import { TimeInput } from "@components/TimeInput";

export const DatetimeRangePicker: FC = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromTime, setFromTime] = useState("00:00");
  const [toTime, setToTime] = useState("00:00");
  const modifiers = { start: fromDate, end: toDate };

  return (
    <div className='flex gap-2'>
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
        />
        <TimeInput
          className='InputTime-from'
          value={fromTime}
          onChange={setFromTime}
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
        />
        <TimeInput
          className='InputTime-to'
          value={toTime}
          onChange={setToTime}
        />
      </span>
    </div>
  );
};
