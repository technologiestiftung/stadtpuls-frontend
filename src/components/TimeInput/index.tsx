import { FC } from "react";
import TimeField from "react-simple-timefield";
import styles from "./TimeInput.module.css";

interface TimeInputProps {
  value?: string;
  className?: string;
  onChange: (val: string) => void;
}

export const TimeInput: FC<TimeInputProps> = ({
  value,
  onChange,
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
          "font-mono relative focus:z-30 w-20 text-center",
          "inline-block border border-gray-200 px-3 py-2",
          styles.timeInput,
        ].join(" ")}
      />
    }
  />
);
