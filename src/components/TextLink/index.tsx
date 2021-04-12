import { forwardRef, HTMLProps } from "react";

// eslint-disable-next-line react/display-name
export const TextLink = forwardRef<
  HTMLAnchorElement,
  HTMLProps<HTMLAnchorElement>
>(({ className = "", children, ...rest }, ref) => (
  <a
    {...rest}
    ref={ref}
    className={`text-primary underline transition hover:opacity-60 cursor-pointer focus-offset ${className}`}
  >
    {children}
  </a>
));
