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
          "absolute w-[calc(100%-1.5rem)] h-full top-0 left-6 z-30",
          "bg-white opacity-50 pointer-events-none",
        ].join(" ")}
      />
    )}
    <div className='grid grid-cols-[1.5rem,auto] text-sm mb-2'>
      <input
        type='radio'
        checked={isSelected}
        name={name}
        tabIndex={0}
        readOnly
      />
      <label htmlFor={name} className={isSelected ? "text-blue" : ""}>
        {label}
      </label>
    </div>
    <div className='pl-6'>{children}</div>
  </fieldset>
);
