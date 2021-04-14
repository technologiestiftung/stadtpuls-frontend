import { forwardRef, HTMLProps, ReactNode } from "react";

interface ButtonPropType
  extends Omit<HTMLProps<HTMLButtonElement>, "children"> {
  children: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "dangerous";
}
interface SubmitPropType extends Omit<HTMLProps<HTMLInputElement>, "children"> {
  children: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "dangerous";
}

const getButtonStyles = ({
  variant,
  disabled,
  className,
}: {
  variant?: "primary" | "secondary" | "dangerous";
  disabled?: boolean;
  className?: string;
}): string => {
  const classes = ["px-4 py-2 font-sans text-lg transition"];
  if (disabled) {
    classes.push("cursor-default");
    switch (variant) {
      case "primary":
        classes.push("bg-gray-200 text-gray-400");
        break;
      case "dangerous":
        classes.push("bg-white border border-red-300 text-red-300");
        break;
      default:
        classes.push("bg-white border border-gray-400 text-gray-400");
        break;
    }
  } else {
    switch (variant) {
      case "primary":
        classes.push(
          "cursor-pointer focus-offset bg-blue-500 text-white hover:opacity-60"
        );
        break;
      case "dangerous":
        classes.push(
          "cursor-pointer focus-offset bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-10"
        );
        break;
      default:
        classes.push(
          "cursor-pointer focus-offset bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:bg-opacity-10"
        );
        break;
    }
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
      {children || "Weiter"}
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
