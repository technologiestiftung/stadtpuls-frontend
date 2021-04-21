import { forwardRef, HTMLProps } from "react";

interface TextLinkPropType {
  variant?: "primary" | "secondary" | "dangerous";
}
type AnchorTextLinkPropType = HTMLProps<HTMLAnchorElement> & TextLinkPropType;
type ButtonTextLinkPropType = HTMLProps<HTMLButtonElement> & TextLinkPropType;

const textLinkCommonStyle =
  "focus-offset underline transition hover:opacity-60 cursor-pointer";
const textLinkDefaultStyle = "text-blue-500 focus:ring-blue-500";
const textLinkSecondaryStyle = "text-gray-500 focus:ring-blue-500";
const textLinkDangerousStyle = "text-red-500 focus:ring-red-500";

type GetLinkStyleType = TextLinkPropType & { className?: string };
const getLinkStyle = (props: GetLinkStyleType): string =>
  [
    textLinkCommonStyle,
    props.variant === "dangerous" && textLinkDangerousStyle,
    props.variant === "secondary" && textLinkSecondaryStyle,
    (!props.variant || props.variant === "primary") && textLinkDefaultStyle,
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

// eslint-disable-next-line react/display-name
export const TextLink = forwardRef<HTMLAnchorElement, AnchorTextLinkPropType>(
  ({ children, ...rest }, ref) => (
    <a {...rest} ref={ref} className={getLinkStyle(rest)}>
      {children}
    </a>
  )
);

// eslint-disable-next-line react/display-name
export const ButtonTextLink = forwardRef<
  HTMLButtonElement,
  ButtonTextLinkPropType
>(({ children, ...rest }, ref) => (
  <button {...rest} type='button' ref={ref} className={getLinkStyle(rest)}>
    {children}
  </button>
));
