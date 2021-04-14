import { HTMLProps, forwardRef, ReactNode } from "react";

export interface SelectOptionType {
  name: string;
  value: string;
}

interface FormSelectPropType
  extends Omit<HTMLProps<HTMLSelectElement>, "label" | "value"> {
  name: string;
  label?: ReactNode;
  options: SelectOptionType[];
}

// eslint-disable-next-line react/display-name
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectPropType>(
  ({ name, label, options, ...selectProps }, ref) => (
    <div className='max-w-prose'>
      {label && (
        <label
          htmlFor={name}
          className='block mb-2 cursor-pointer transition hover:opacity-60'
        >
          {label}
        </label>
      )}
      <select
        name={name}
        id={`${name}`}
        ref={ref}
        {...selectProps}
        className='text-blue-500'
      >
        {options.map(({ name, value }) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
);
