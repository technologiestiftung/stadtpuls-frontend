import { forwardRef, HTMLProps, ReactNode } from "react";

interface ButtonPropType
  extends Omit<HTMLProps<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dangerous" | "disabled";
}
interface SubmitPropType extends Omit<HTMLProps<HTMLInputElement>, "children"> {
  children: string;
  variant?: "primary" | "secondary" | "dangerous" | "disabled";
}

const getButtonStyles = ({
  variant,
  className,
}: {
  variant?: "primary" | "secondary" | "dangerous" | "disabled";
  className?: string;
}): string => {
  const classes = ["px-4 py-2 font-sans text-lg transition"];
  switch (variant) {
    case "primary":
      classes.push(
        "cursor-pointer focus-offset bg-primary text-white hover:opacity-60"
      );
      break;
    case "dangerous":
      classes.push(
        "cursor-pointer focus-offset bg-white border border-secondary text-secondary hover:bg-secondary hover:bg-opacity-10"
      );
      break;
    case "disabled":
      classes.push("bg-gray-300 text-gray-600 cursor-default");
      break;
    default:
      classes.push(
        "cursor-pointer focus-offset bg-white border border-primary text-primary hover:bg-primary hover:bg-opacity-10"
      );
      break;
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
