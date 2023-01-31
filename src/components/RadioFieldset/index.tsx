import { FC } from "react";

interface RadioFieldsetPropType {
  name: string;
  label: string;
  isSelected: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export const RadioFieldset: FC<RadioFieldsetPropType> = ({
  name,
  label,
  isSelected,
  children,
  disabled = false,
  onSelect = () => undefined,
}) => (
  <fieldset
    className={["relative", disabled && "cursor-not-allowed"].join(" ")}
    onClick={onSelect}
    disabled={disabled}
  >
    {!isSelected && (
      <div
        className={[
          "absolute w-full h-full inset-0 left-7 z-30",
          "bg-white opacity-50 pointer-events-none",
        ].join(" ")}
      />
    )}
    <div className='flex gap-1'>
      <input
        type='radio'
        checked={isSelected}
        name={name}
        tabIndex={0}
        readOnly
        className={[disabled && "cursor-not-allowed"].join(" ")}
      />
      <label
        htmlFor={name}
        className={`inline-block text-sm mb-2 ${
          isSelected ? "text-blue" : ""
        } ${disabled ? "cursor-not-allowed" : ""}`}
      >
        {label}
      </label>
    </div>
    <div className='pl-7'>{children}</div>
  </fieldset>
);
