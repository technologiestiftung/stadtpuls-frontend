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
  errors?: string[];
}

// eslint-disable-next-line react/display-name
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectPropType>(
  (
    {
      name,
      label,
      options,
      placeholder = "Bitte wähle eine Option",
      errors = [],
      ...selectProps
    },
    ref
  ) => {
    const [selectValue, setSelectValue] = useState<string>(placeholder);
    const placeholderIsSelected =
      selectValue === placeholder || selectValue === "";

    return (
      <div className='mb-2'>
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
          className={`mb-2 ${
            placeholderIsSelected ? "text-gray-500" : "text-blue"
          } ${errors.length ? "error" : ""}`}
          onBlur={evt => setSelectValue(evt.target.value)}
        >
          <option value=''>{placeholder}</option>
          {options.map(({ name, value }) => (
            <option value={value} key={value}>
              {name}
            </option>
          ))}
        </select>
        {errors.map(error => (
          <p className='text-error text-sm' key={error}>
            {error}
          </p>
        ))}
      </div>
    );
  }
);
