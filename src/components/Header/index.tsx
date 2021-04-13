import Link from "next/link";
import { IotHubLogo } from "@components/IotHubLogo";
import { TsbLogoSymbol } from "@components/TsbLogoSymbol";
import { AuthLink } from "@components/AuthLink";

export const Header: React.FC = () => (
  <header
    className={[
      "w-full p-4 bg-white shadow-lg z-50",
      "relative flex place-content-between",
      "md:sticky md:top-0",
    ].join(" ")}
  >
    <Link href='/'>
      <IotHubLogo />
    </Link>
    <section className='flex gap-8 items-center'>
      <AuthLink />
      <TsbLogoSymbol />
    </section>
  </header>
);
