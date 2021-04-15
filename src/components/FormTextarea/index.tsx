import { HTMLProps, forwardRef } from "react";

export interface FormTextareaPropType
  extends Omit<HTMLProps<HTMLTextAreaElement>, "label" | "value"> {
  name: string;
  label?: string;
  placeholder?: string;
  maxCharacters?: number;
  minCharacters?: number;
  errors?: string[];
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
      placeholder = "Bitte hier Text eingeben ...",
      maxCharacters = 140,
      minCharacters = 10,
      errors = [],
      ...textareaProps
    },
    ref
  ) => (
    <div className=' mb-2'>
      {label && (
        <label
          htmlFor={`${name}-textarea`}
          className='block mb-2 cursor-pointer transition hover:opacity-60'
        >
          {label}
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
        ref={ref}
      ></textarea>
      {errors.map(error => (
        <p className='text-red-500 text-sm' key={error}>
          {error}
        </p>
      ))}
    </div>
  )
);
