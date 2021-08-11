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
  <fieldset className='relative'>
    {!isSelected && (
      <button
        onClick={onSelect}
        className={[
          "absolute w-[calc(100%-1.5rem)] h-full top-0 left-6 z-30",
          "bg-white opacity-50 focus:outline-none",
        ].join(" ")}
        tabIndex={-1}
      />
    )}
    <div className='grid grid-cols-[1.5rem,auto] text-sm mb-2'>
      <input
        type='radio'
        checked={isSelected}
        name={name}
        onChange={() => !isSelected && onSelect()}
        tabIndex={0}
      />
      <label htmlFor={name} className={isSelected ? "text-blue" : ""}>
        {label}
      </label>
    </div>
    <div className='pl-6'>{children}</div>
  </fieldset>
);
