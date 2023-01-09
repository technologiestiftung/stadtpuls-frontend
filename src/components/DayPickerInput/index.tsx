import { FC } from "react";
import OriginalDayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "react-day-picker/moment";
import "moment/locale/de";
import { DayPickerInputProps } from "react-day-picker/types/Props";
import styles from "./DayPickerInput.module.css";

interface DayPickerInputExtendedProps extends DayPickerInputProps {
  nextElSelector?: string;
  tabIndex?: number;
  value: Date;
  disabled?: boolean;
  onDayChange?: (val: Date) => void;
}

const dayPickerClassNames = {
  container: `${styles.container} DayPicker`,
  wrapper: `${styles.wrapper} DayPicker-wrapper`,
  interactionDisabled: `${styles.interactionDisabled} DayPicker--interactionDisabled`,
  months: `${styles.months} DayPicker-Months`,
  month: `${styles.month} DayPicker-Month`,

  navBar: `${styles.navBar} DayPicker-NavBar`,
  navButtonPrev: `${styles.navButton} DayPicker-NavButton DayPicker-NavButton--prev`,
  navButtonNext: `${styles.navButton} DayPicker-NavButton DayPicker-NavButton--next`,
  navButtonInteractionDisabled: `${styles.navButtonInteractionDisabled} DayPicker-NavButton--interactionDisabled`,

  caption: `${styles.caption} DayPicker-Caption`,
  weekdays: `${styles.weekdays} DayPicker-Weekdays`,
  weekdaysRow: `${styles.weekdaysRow} DayPicker-WeekdaysRow`,
  weekday: `${styles.weekday} DayPicker-Weekday`,
  body: `${styles.body} DayPicker-Body`,
  week: `${styles.week} DayPicker-Week`,
  weekNumber: `${styles.weekNumber} DayPicker-WeekNumber`,
  day: `${styles.day} DayPicker-Day`,
  footer: `${styles.footer} DayPicker-Footer`,
  todayButton: `${styles.todayButton} DayPicker-TodayButton`,

  today: `${styles.today}`,
  selected: `${styles.selected}`,
  disabled: `${styles.disabled} disabled`,
  outside: `${styles.outside} outside`,
};

export const formatDate = (d: Date): string =>
  moment.formatDate(d, "DD/MM/YYYY");
export const parseDate = (s: string): Date | undefined =>
  moment.parseDate(s, "DD/MM/YYYY");

export const DayPickerInput: FC<DayPickerInputExtendedProps> = ({
  onDayChange = () => undefined,
  tabIndex = 1,
  value,
  dayPickerProps,
  disabled = false,
  nextElSelector,
  ...props
}) => {
  return (
    <OriginalDayPickerInput
      value={value}
      format='DD/MM/YYYY'
      placeholder='DD/MM/YYYY'
      formatDate={formatDate}
      parseDate={parseDate}
      dayPickerProps={{
        localeUtils: moment,
        locale: "de",
        numberOfMonths: 1,
        classNames: {
          ...dayPickerClassNames,
          ...props.classNames,
        },
        onDayClick:
          dayPickerProps?.onDayClick ||
          (() => {
            if (!nextElSelector) return;
            const nextEl = document.querySelector(
              nextElSelector
            ) as HTMLInputElement;
            if (!nextEl) return;
            nextEl.focus();
            nextEl.setSelectionRange(0, 0);
          }),
        ...dayPickerProps,
      }}
      onDayChange={selectedDay => {
        typeof selectedDay !== "undefined" && onDayChange(selectedDay);
      }}
      classNames={{
        container: styles.inputContainer,
        overlayWrapper: "",
        overlay: "",
      }}
      inputProps={{
        tabIndex,
        class: [disabled && "cursor-not-allowed"].join(" "),
      }}
      {...props}
    />
  );
};
