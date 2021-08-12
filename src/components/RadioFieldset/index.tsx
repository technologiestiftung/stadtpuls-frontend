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
          "absolute w-full h-full inset-0 z-30",
          "bg-white opacity-50 pointer-events-none",
        ].join(" ")}
      />
    )}
    <label
      htmlFor={name}
      className={`inline-block text-sm mb-2 ${isSelected ? "text-blue" : ""}`}
    >
      {label}
    </label>
    <div>{children}</div>
  </fieldset>
);
