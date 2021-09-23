import {
  HTMLProps,
  forwardRef,
  ReactNode,
  useState,
  useEffect,
  ChangeEventHandler,
} from "react";

export interface SelectOptionType {
  name: string;
  value: string | number;
}

interface FormSelectPropType
  extends Omit<HTMLProps<HTMLSelectElement>, "label" | "value" | "onChange"> {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  className?: string;
  options: SelectOptionType[];
  errors?: string[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (name: string) => void;
}

// eslint-disable-next-line react/display-name
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectPropType>(
  (
    {
      name,
      label,
      options,
      placeholder = "Bitte wähle eine Option",
      className = "",
      errors = [],
      value,
      defaultValue,
      onChange = () => undefined,
      ...selectProps
    },
    ref
  ) => {
    const [selectValue, setSelectValue] = useState<string | number | undefined>(
      value || defaultValue
    );

    useEffect(() => {
      value && setSelectValue(`${value}`);
    }, [value]);

    const handleSelect: ChangeEventHandler = evt => {
      evt.preventDefault();
      const target = evt.target as HTMLSelectElement;
      const newVal = target.value;
      onChange ? onChange(newVal) : setSelectValue(newVal);
    };

    return (
      <div className={`${className} mb-2`}>
        {label && (
          <label
            htmlFor={name}
            className='block mb-2 cursor-pointer transition hover:opacity-60'
          >
            {label}
          </label>
        )}
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          name={name}
          id={`${name}`}
          ref={ref}
          required
          {...selectProps}
          className={`mb-2 ${
            !selectValue && placeholder ? "text-gray-500" : "text-blue"
          } ${errors.length ? "error" : ""}`}
          onChange={handleSelect}
          value={selectValue}
        >
          {!selectValue && placeholder && (
            <option value=''>{placeholder}</option>
          )}
          {options.map(({ name, value: val }) => (
            <option value={`${val}`} key={`${val}`}>
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
