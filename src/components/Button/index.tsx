import { forwardRef, HTMLProps, ReactNode } from "react";

interface ButtonPropType
  extends Omit<HTMLProps<HTMLButtonElement>, "children"> {
  children: ReactNode;
}
interface SubmitPropType extends Omit<HTMLProps<HTMLInputElement>, "children"> {
  children: string;
}

const getButtonStyles = ({
  disabled,
  className,
}: {
  disabled?: boolean;
  className?: string;
}): string =>
  [
    "px-4 py-2 font-sans text-lg transition",
    disabled
      ? "bg-gray-300 text-gray-600 cursor-default"
      : "bg-primary text-white hover:opacity-60 cursor-pointer focus-offset",
    className,
  ]
    .filter(Boolean)
    .join(" ");

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonPropType>(
  ({ children, ...buttonProps }, ref) => (
    <button
      {...buttonProps}
      ref={ref}
      type='button'
      className={getButtonStyles(buttonProps)}
    >
      {children}
    </button>
  )
);

// eslint-disable-next-line react/display-name
export const Submit = forwardRef<HTMLInputElement, SubmitPropType>(
  ({ children, ...submitProps }, ref) => (
    <input
      {...submitProps}
      ref={ref}
      type='submit'
      className={getButtonStyles(submitProps)}
      value={children}
    />
  )
);
