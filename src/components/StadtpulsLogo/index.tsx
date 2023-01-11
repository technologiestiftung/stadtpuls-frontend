import Link from "next/link";
import { forwardRef, HTMLProps } from "react";
import styles from "./StadtpulsLogo.module.css";

interface StadtpulsLogoPropType extends HTMLProps<HTMLAnchorElement> {
  className?: string;
}

export const StadtpulsLogo = forwardRef<
  HTMLAnchorElement,
  StadtpulsLogoPropType
>(({ className = "" }, ref) => (
  <Link href='/'>
    <a
      className={["w-max flex items-center", className, styles.logoContainer]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    >
      <span className='relative inline-flex h-[29px] items-center sm:gap-4'>
        <span className={styles.logoImage} role='img' />
      </span>
    </a>
  </Link>
));
