import { HTMLProps, forwardRef, ReactNode } from "react";
import styles from "./FormTextInput.module.css";

interface FormTextInputPropType
  extends Omit<HTMLProps<HTMLInputElement>, "label"> {
  name: string;
  label?: ReactNode;
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
          className={`${styles.label} block mb-2 cursor-pointer transition`}
        >
          {typeof label === "string" ? <span>{label}</span> : label}{" "}
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
