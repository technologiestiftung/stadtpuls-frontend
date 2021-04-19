import { forwardRef, HTMLProps, ReactNode } from "react";

export type ButtonVariantsType = "primary" | "secondary" | "text" | "dangerous";

interface ButtonPropType
  extends Omit<HTMLProps<HTMLButtonElement>, "children"> {
  children: ReactNode;
  disabled?: boolean;
  variant?: ButtonVariantsType;
}

export interface AnchorPropType
  extends Omit<HTMLProps<HTMLAnchorElement>, "children"> {
  children: ReactNode;
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
  const classes = ["font-sans transition"];
  if (disabled) {
    classes.push("cursor-default");
    switch (variant) {
      case "primary":
        classes.push("text-lg px-4 py-2 bg-gray-200 text-gray-400");
        break;
      case "text":
        classes.push("text-base px-0 py-0 text-gray-300");
        break;
      case "dangerous":
        classes.push(
          "text-lg px-4 py-2 bg-white border border-red-300 text-red-300"
        );
        break;
      default:
        classes.push(
          "text-lg px-4 py-2 bg-white border border-gray-400 text-gray-400"
        );
        break;
    }
  } else {
    switch (variant) {
      case "primary":
        classes.push(
          "text-lg px-4 py-2 cursor-pointer focus-offset bg-blue-500 text-white hover:opacity-60"
        );
        break;
      case "text":
        classes.push(
          "text-base px-0 py-0 cursor-pointer focus-offset bg-transparent text-blue-500 border-none hover:opacity-60 underline"
        );
        break;
      case "dangerous":
        classes.push(
          "text-lg px-4 py-2 cursor-pointer focus-offset bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-10"
        );
        break;
      default:
        classes.push(
          "text-lg px-4 py-2 cursor-pointer focus-offset bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:bg-opacity-10"
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
export const Anchor = forwardRef<HTMLAnchorElement, AnchorPropType>(
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
