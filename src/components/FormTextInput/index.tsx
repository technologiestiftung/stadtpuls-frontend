import { HTMLProps, forwardRef } from "react";

interface FormTextInputPropType extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  errors?: string[];
  optional?: boolean;
}

// eslint-disable-next-line react/display-name
export const FormTextInput = forwardRef<
  HTMLInputElement,
  FormTextInputPropType
>(({ name, label, optional = false, errors = [], ...inputProps }, ref) => (
  <div className=' mb-2'>
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
      {...inputProps}
      ref={ref}
      id={name}
      className={`mb-2 ${errors.length ? "error" : ""}`}
    />
    {errors.map(error => (
      <p className='text-red-500 text-sm' key={error}>
        {error}
      </p>
    ))}
  </div>
));
