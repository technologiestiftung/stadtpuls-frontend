import { forwardRef, HTMLProps } from "react";

const textLinkStyle =
  "text-blue-500 underline transition hover:opacity-60 cursor-pointer focus-offset";

// eslint-disable-next-line react/display-name
export const TextLink = forwardRef<
  HTMLAnchorElement,
  HTMLProps<HTMLAnchorElement>
>(({ className = "", children, ...rest }, ref) => (
  <a {...rest} ref={ref} className={`${textLinkStyle} ${className}`}>
    {children}
  </a>
));

// eslint-disable-next-line react/display-name
export const TextLinkButton = forwardRef<
  HTMLButtonElement,
  HTMLProps<HTMLButtonElement>
>(({ className = "", children, ...rest }, ref) => (
  <button
    {...rest}
    type='button'
    ref={ref}
    className={`${textLinkStyle} ${className}`}
  >
    {children}
  </button>
));
