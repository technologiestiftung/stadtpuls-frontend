import { forwardRef, HTMLProps } from "react";

export type ButtonVariantsType = "primary" | "secondary" | "dangerous";

interface ButtonPropType extends HTMLProps<HTMLButtonElement> {
  disabled?: boolean;
  variant?: ButtonVariantsType;
}

export interface AnchorButtonPropType extends HTMLProps<HTMLAnchorElement> {
  variant?: ButtonVariantsType;
  href: string;
}
interface SubmitPropType extends Omit<HTMLProps<HTMLInputElement>, "children"> {
  children: string;
  disabled?: boolean;
  variant?: ButtonVariantsType;
}

const getButtonStyles = ({
  variant,
  disabled,
  className,
}: {
  variant?: ButtonVariantsType;
  disabled?: boolean;
  className?: string;
}): string => {
  const classes = ["text-lg px-4 py-2 font-sans transition"];
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
    classes.push("cursor-pointer focus-offset");
    switch (variant) {
      case "primary":
        classes.push(
          "focus:ring-blue-500 bg-blue-500 text-white hover:opacity-60"
        );
        break;
      case "dangerous":
        classes.push(
          "focus:ring-red-500 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-10"
        );
        break;
      default:
        classes.push(
          "focus:ring-blue-500 bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:bg-opacity-10"
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

// eslint-disable-next-line react/display-name
export const AnchorButton = forwardRef<HTMLAnchorElement, AnchorButtonPropType>(
  ({ href, children, ...anchorProps }, ref) => (
    <a
      href={href}
      {...anchorProps}
      ref={ref}
      className={getButtonStyles(anchorProps)}
    >
      {children}
    </a>
  )
);
