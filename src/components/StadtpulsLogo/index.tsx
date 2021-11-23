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
      className={["w-max flex items-center", className, styles.logoContainer]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    >
      <span className='relative inline-flex h-[29px] items-center sm:gap-4'>
        <span className={styles.logoImage} role='img' />
        <span
          className={[
            "inline-block absolute sm:static top-0 right-0 px-1 text-[11px]",
            "tracking-wider font-bold bg-blue text-green",
            "transform -translate-y-2.5 translate-x-6 sm:transform-none",
          ].join(" ")}
        >
          BETA
        </span>
      </span>
    </a>
  </Link>
));
