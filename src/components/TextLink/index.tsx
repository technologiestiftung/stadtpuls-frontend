import { FC, HTMLProps } from "react";

export const TextLink: FC<HTMLProps<HTMLAnchorElement>> = ({
  className = "",
  children,
  ...rest
}) => (
  <a
    {...rest}
    className={`text-primary underline transition hover:opacity-60 cursor-pointer focus-offset ${className}`}
  >
    {children}
  </a>
);
