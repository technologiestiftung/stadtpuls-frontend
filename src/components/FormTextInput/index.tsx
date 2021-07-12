import { HTMLProps, forwardRef } from "react";

interface FormTextInputPropType extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  containerClassName?: string;
  errors?: string[];
  optional?: boolean;
}

// eslint-disable-next-line react/display-name
export const FormTextInput = forwardRef<
  HTMLInputElement,
  FormTextInputPropType
>(
  (
    {
      name,
      label,
      optional = false,
      errors = [],
      containerClassName = "mb-2",
      className = "mb-2",
      ...inputProps
    },
    ref
  ) => (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={name}
          className='block mb-2 cursor-pointer transition hover:opacity-60'
        >
          {label}{" "}
          {optional && (
            <span className='text-gray-500 float-right text-sm transform translate-y-1'>
              (Optional)
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        className={`${errors.length ? "error" : ""} ${className}`}
        {...inputProps}
      />
      {errors.map(error => (
        <p className='text-error text-sm' key={error}>
          {error}
        </p>
      ))}
    </div>
  )
);
