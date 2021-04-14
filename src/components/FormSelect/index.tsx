import { HTMLProps, forwardRef, ReactNode, useState } from "react";

export interface SelectOptionType {
  name: string;
  value: string;
}

interface FormSelectPropType
  extends Omit<HTMLProps<HTMLSelectElement>, "label" | "value"> {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  options: SelectOptionType[];
}

// eslint-disable-next-line react/display-name
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectPropType>(
  (
    {
      name,
      label,
      options,
      placeholder = "Bitte wähle eine Option",
      ...selectProps
    },
    ref
  ) => {
    const [selectValue, setSelectValue] = useState<string>(placeholder);
    const placeholderIsSelected =
      selectValue === placeholder || selectValue === "";

    return (
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
          required
          {...selectProps}
          className={`${
            placeholderIsSelected ? "text-gray-500" : "text-blue-500"
          }`}
          onBlur={evt => setSelectValue(evt.target.value)}
        >
          <option value=''>{placeholder}</option>
          {options.map(({ name, value }) => (
            <option value={value} key={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
