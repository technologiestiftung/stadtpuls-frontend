import { forwardRef, HTMLProps } from "react";

export type ButtonVariantsType = "primary" | "secondary" | "dangerous";

interface ButtonPropType extends HTMLProps<HTMLButtonElement> {
  disabled?: boolean;
  isOnDark?: boolean;
  variant?: ButtonVariantsType;
}

export interface AnchorButtonPropType extends HTMLProps<HTMLAnchorElement> {
  variant?: ButtonVariantsType;
  isOnDark?: boolean;
  href: string;
}
interface SubmitPropType extends Omit<HTMLProps<HTMLInputElement>, "children"> {
  children: string;
  disabled?: boolean;
  isOnDark?: boolean;
  variant?: ButtonVariantsType;
}

const getButtonStyles = ({
  variant,
  disabled,
  isOnDark,
  className,
}: {
  variant?: ButtonVariantsType;
  disabled?: boolean;
  isOnDark?: boolean;
  className?: string;
}): string => {
  const classes = [
    "inline-block font-headline transition",
    "text-base sm:text-lg rounded-none",
    "px-3 sm:px-4",
    "py-1.5 sm:py-2",
  ];
  if (disabled) {
    classes.push("cursor-default");
    switch (variant) {
      case "primary":
        classes.push("bg-gray-200 text-gray-400");
        break;
      case "dangerous":
        classes.push("text-error");
        break;
      default:
        classes.push("border border-gray-400 text-gray-400");
        break;
    }
  } else {
    classes.push("cursor-pointer");
    classes.push(isOnDark ? "focus-offset-dark" : "focus-offset");
    switch (variant) {
      case "primary":
        classes.push(
          "focus:ring-green bg-purple text-white font-bold hover:bg-blue hover:text-green"
        );
        break;
      case "dangerous":
        classes.push(
          "focus:ring-error text-error hover:bg-error hover:bg-opacity-10"
        );
        break;
      default:
        classes.push(
          "focus:ring-green border border-purple hover:bg-opacity-10 hover:bg-green hover:border-green"
        );
        break;
    }
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};

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
