import Link from "next/link";
import { StadtpulsLogo } from "@components/StadtpulsLogo";
import { TsbLogoSymbol } from "@components/TsbLogoSymbol";
import { AuthLink } from "@components/AuthLink";
import { HeaderMenu } from "@components/HeaderMenu";

export const Header: React.FC = () => (
  <header
    className={[
      "w-full p-4 bg-white shadow-lg z-50",
      "flex place-content-between",
      "fixed top-0",
    ].join(" ")}
  >
    <Link href='/'>
      <StadtpulsLogo />
    </Link>
    <section className='flex gap-4 sm:gap-8 items-center'>
      <HeaderMenu />
      <AuthLink />
      <TsbLogoSymbol />
    </section>
  </header>
);
