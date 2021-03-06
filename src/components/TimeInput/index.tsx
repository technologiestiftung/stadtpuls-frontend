import { FC } from "react";
import TimeField from "react-simple-timefield";
import styles from "./TimeInput.module.css";

interface TimeInputProps {
  value?: string;
  tabIndex?: number;
  className?: string;
  onChange: (val: string) => void;
}

export const TimeInput: FC<TimeInputProps> = ({
  value,
  onChange,
  tabIndex = 1,
  className = "",
}) => (
  <TimeField
    value={value}
    onChange={(_e, val) => onChange(val)}
    input={
      <input
        type='text'
        className={[
          className,
          "font-mono relative focus:z-30 w-[4.5rem] text-center",
          "inline-block border border-gray-200 p-1.5",
          styles.timeInput,
        ].join(" ")}
        tabIndex={tabIndex}
      />
    }
  />
);
