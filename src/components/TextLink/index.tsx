import { forwardRef, HTMLProps } from "react";

interface TextLinkPropType {
  variant?: "primary" | "secondary" | "dangerous";
  isOnDark?: boolean;
}
type AnchorTextLinkPropType = HTMLProps<HTMLAnchorElement> & TextLinkPropType;
type ButtonTextLinkPropType = HTMLProps<HTMLButtonElement> & TextLinkPropType;

const textLinkCommonStyle =
  "underline transition cursor-pointer text-left font-headline";
const textLinkDefaultStyle = "focus:ring-green";
const textLinkSecondaryStyle = "focus:ring-green";
const textLinkDangerousStyle = "focus:ring-error hover:opacity-60";
const textLinkDefaultLightColor =
  "text-blue underline-green hover:text-purple focus-offset";
const textLinkDefaultDarkColor =
  "text-green underline-purple hover:text-white focus-offset-dark";
const textLinkSecondaryLightColor =
  "text-gray-500 hover:text-purple focus-offset";
const textLinkSecondaryDarkColor =
  "text-gray-500 hover:text-green focus-offset-dark";
const textLinkDangerousLightColor = "text-error focus-offset";
const textLinkDangerousDarkColor = "text-error focus-offset-dark";

type GetLinkStyleType = TextLinkPropType & { className?: string };
const getLinkStyle = (props: GetLinkStyleType): string =>
  [
    textLinkCommonStyle,
    props.variant === "dangerous" && textLinkDangerousStyle,
    props.variant === "dangerous" &&
      (props.isOnDark
        ? textLinkDangerousDarkColor
        : textLinkDangerousLightColor),
    props.variant === "secondary" && textLinkSecondaryStyle,
    props.variant === "secondary" &&
      (props.isOnDark
        ? textLinkSecondaryDarkColor
        : textLinkSecondaryLightColor),
    (!props.variant || props.variant === "primary") && textLinkDefaultStyle,
    (!props.variant || props.variant === "primary") &&
      (props.isOnDark ? textLinkDefaultDarkColor : textLinkDefaultLightColor),
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

export const TextLink = forwardRef<HTMLAnchorElement, AnchorTextLinkPropType>(
  ({ children, ...rest }, ref) => (
    <a {...rest} ref={ref} className={getLinkStyle(rest)}>
      {children}
    </a>
  )
);

export const ButtonTextLink = forwardRef<
  HTMLButtonElement,
  ButtonTextLinkPropType
>(({ children, ...rest }, ref) => (
  <button {...rest} type='button' ref={ref} className={getLinkStyle(rest)}>
    {children}
  </button>
));
