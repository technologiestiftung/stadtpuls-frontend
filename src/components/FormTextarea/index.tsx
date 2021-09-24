import { HTMLProps, forwardRef, ReactNode } from "react";

export interface FormTextareaPropType
  extends Omit<HTMLProps<HTMLTextAreaElement>, "label" | "value"> {
  name: string;
  label?: ReactNode;
  className?: string;
  placeholder?: string;
  maxCharacters?: number;
  minCharacters?: number;
  errors?: string[];
  optional?: boolean;
}

// eslint-disable-next-line react/display-name
export const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  FormTextareaPropType
>(
  (
    {
      name,
      label,
      placeholder = "Bitte hier Text eingeben...",
      className = "min-h-40",
      maxCharacters = 140,
      minCharacters = 10,
      errors = [],
      optional = false,
      ...textareaProps
    },
    ref
  ) => (
    <div className={`${className} mb-2`}>
      {label && (
        <label
          htmlFor={`${name}-textarea`}
          className='block mb-2 cursor-pointer transition hover:opacity-60'
        >
          {typeof label === "string" ? <span>{label}</span> : label}{" "}
          {optional && (
            <span className='text-gray-500 float-right text-sm transform translate-y-1'>
              (Optional)
            </span>
          )}
        </label>
      )}
      <textarea
        {...textareaProps}
        name={name}
        id={`${name}-textarea`}
        cols={30}
        rows={10}
        maxLength={maxCharacters}
        minLength={minCharacters}
        placeholder={placeholder}
        className={`mb-2 h-32 ${errors.length ? "error" : ""}`}
        ref={ref}
      ></textarea>
      {errors.map(error => (
        <p className='text-error text-sm' key={error}>
          {error}
        </p>
      ))}
    </div>
  )
);
