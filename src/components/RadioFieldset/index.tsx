import { FC } from "react";

interface RadioFieldsetPropType {
  name: string;
  label: string;
  isSelected: boolean;
  onSelect?: () => void;
}

export const RadioFieldset: FC<RadioFieldsetPropType> = ({
  name,
  label,
  isSelected,
  children,
  onSelect = () => undefined,
}) => (
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  <fieldset className='relative' onClick={onSelect}>
    {/* eslint-enable jsx-a11y/click-events-have-key-events */
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
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
      />
      <label
        htmlFor={name}
        className={`inline-block text-sm mb-2 ${isSelected ? "text-blue" : ""}`}
      >
        {label}
      </label>
    </div>
    <div className='pl-7'>{children}</div>
  </fieldset>
);
