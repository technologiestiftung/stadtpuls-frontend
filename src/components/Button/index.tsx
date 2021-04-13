import { forwardRef, HTMLProps, ReactNode } from "react";

interface ButtonPropType
  extends Omit<HTMLProps<HTMLButtonElement>, "children"> {
  children: ReactNode;
  secondary?: boolean;
  warning?: boolean;
}
interface SubmitPropType extends Omit<HTMLProps<HTMLInputElement>, "children"> {
  children: string;
}

const getButtonStyles = ({
  secondary,
  warning,
  disabled,
  className,
}: {
  secondary?: boolean;
  disabled?: boolean;
  warning?: boolean;
  className?: string;
}): string => {
  const classes = ["px-4 py-2 font-sans text-lg transition"];
  if (disabled) classes.push("bg-gray-300 text-gray-600 cursor-default");
  else {
    classes.push("cursor-pointer focus-offset");
    if (secondary)
      classes.push(
        `bg-white border border-primary text-primary hover:bg-primary hover:bg-opacity-10`
      );
    else if (warning)
      classes.push(
        `bg-white border border-secondary text-secondary hover:bg-secondary hover:bg-opacity-10`
      );
    else classes.push(`bg-primary text-white hover:opacity-60`);
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};

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
