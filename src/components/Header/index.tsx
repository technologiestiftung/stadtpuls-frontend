import Link from "next/link";
import { FC } from "react";
import { useAuth } from "@auth/Auth";
import { IotHubLogo } from "@components/IotHubLogo";
import { TsbLogoSymbol } from "@components/TsbLogoSymbol";
import AccountCircle from "@material-ui/icons/AccountCircle";

const LoginLink: FC = () => (
  <Link href='/signin'>
    <a href='/signin' className='group'>
      <span className='text-gray-400 transform -translate-y-0.5 transition inline-block group-hover:text-primary'>
        <AccountCircle />
      </span>
      <span className='inline-block ml-1 group-hover:text-primary transition'>
        Anmeldung
      </span>
    </a>
  </Link>
);

export const Header: React.FC = () => {
  const { authenticatedUser } = useAuth();
  return (
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
      <section className='flex gap-8'>
        {authenticatedUser ? authenticatedUser.email : <LoginLink />}
        <TsbLogoSymbol />
      </section>
    </header>
  );
};
