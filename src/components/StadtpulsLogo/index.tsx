import Link from "next/link";
import { forwardRef, HTMLProps } from "react";
import styles from "./StadtpulsLogo.module.css";

interface StadtpulsLogoPropType extends HTMLProps<HTMLAnchorElement> {
  className?: string;
}

// eslint-disable-next-line react/display-name
export const StadtpulsLogo = forwardRef<
  HTMLAnchorElement,
  StadtpulsLogoPropType
>(({ className = "" }, ref) => (
  <Link href='/'>
    <a
      href='/'
      className={["w-max flex items-center", className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    >
      <span className={styles.logo} role='img' />
    </a>
  </Link>
));
