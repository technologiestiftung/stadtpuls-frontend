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
  value: string;
}

interface FormSelectPropType
  extends Omit<HTMLProps<HTMLSelectElement>, "label" | "value"> {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  options: SelectOptionType[];
  errors?: string[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (name: string) => void;
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
      defaultValue,
      value,
      onValueChange = () => undefined,
      ...selectProps
    },
    ref
  ) => {
    const [selectValue, setSelectValue] = useState<string>(
      value || defaultValue || placeholder
    );
    const placeholderIsSelected =
      selectValue === placeholder || selectValue === "";

    useEffect(() => {
      defaultValue && setSelectValue(defaultValue);
    }, [defaultValue]);

    const handleSelect: ChangeEventHandler = evt => {
      evt.preventDefault();
      const target = evt.target as HTMLSelectElement;
      const newVal = target.selectedOptions[0].value;
      onValueChange ? onValueChange(newVal) : setSelectValue(newVal);
    };

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
          onBlur={handleSelect}
          onChange={handleSelect}
          defaultValue={selectValue}
        >
          {!defaultValue && <option value=''>{placeholder}</option>}
          {options.map(({ name, value: val }) => (
            <option value={val} key={val}>
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
