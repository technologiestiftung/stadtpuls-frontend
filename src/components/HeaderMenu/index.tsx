import { useAuth } from "@auth/Auth";
import { ActiveLink } from "@components/ActiveLink";
import useClickOutside from "@lib/hooks/useClickOutside";
import { useUserData } from "@lib/hooks/useUserData";
import { Close, Menu } from "@material-ui/icons";
import { FC, ReactNode, useState } from "react";
import ArrowOutOfDoor from "../../../public/images/icons/16px/arrowOutOfDoor.svg";

interface MenuPageType {
  href: string;
  text: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface HeaderMenuPropType {
  hasDarkMode?: boolean;
}

interface MenuLinkPropType extends MenuPageType {
  className?: string;
  onClick: () => void;
}

const pages: MenuPageType[] = [
  { href: "/accounts", text: "Accounts" },
  { href: "/sensors", text: "Sensoren" },
  { href: "/docs", text: "Dokumentation" },
];

const HeaderLink: FC<MenuLinkPropType> = ({
  text,
  href,
  className = "",
  onClick,
}) => (
  <li className={`${className} text-xl lg:text-base`}>
    <ActiveLink activeClassName='navigation-link-active' href={href}>
      <a
        href={href}
        className='navigation-link p-4 block lg:inline lg:px-2 lg:-ml-2 lg:py-0.5 focus-offset'
        onClick={onClick}
      >
        {text}
      </a>
    </ActiveLink>
  </li>
);

export const HeaderMenu: FC<HeaderMenuPropType> = ({ hasDarkMode = false }) => {
  const { signOut } = useAuth();
  const { user } = useUserData();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggleIsOpened = (): void => setIsOpened(!isOpened);
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpened(false));
  return (
    <div ref={menuRef}>
      <button
        className='lg:hidden focus-offset relative z-0'
        onClick={toggleIsOpened}
      >
        {isOpened ? <Close /> : <Menu />}
      </button>
      <nav
        className={[
          "fixed lg:static",
          "lg:top-auto",
          "left-1/2 lg:left-auto",
          "transform -translate-x-1/2 lg:translate-x-0",
          "sm:border-r lg:border-r-0",
          "sm:border-l lg:border-l-0",
          "z-20 lg:z-auto",
          "w-full lg:w-auto",
          "shadow lg:shadow-none",
          "container max-w-8xl mx-auto",
          "lg:py-4 lg:px-1 lg:p-0 lg:bg-opacity-0",
          hasDarkMode ? "bg-black" : "bg-white",
          "transition",
          !isOpened
            ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"
            : "",
        ].join(" ")}
        style={{ top: 62 }}
      >
        <ul className='h-full lg:w-auto lg:flex lg:gap-8 lg:mr-4'>
          <HeaderLink
            href='/'
            text='Startseite'
            className='lg:hidden'
            onClick={() => setIsOpened(false)}
          />
          {[
            ...pages,
            ...(user
              ? [
                  {
                    href: `/${user.username}/sensors`,
                    text: "Deine Sensoren",
                    className: "lg:hidden",
                  },
                  {
                    href: `/${user.username}/tokens`,
                    text: "Deine Tokens",
                    className: "lg:hidden",
                  },
                  {
                    href: `#`,
                    text: (
                      <span className='inline-flex gap-2 items-center font-bold font-headline'>
                        <ArrowOutOfDoor /> Logout
                      </span>
                    ),
                    onClick: () => signOut(),
                    className: "lg:hidden",
                  },
                ]
              : []),
          ].map(({ href, onClick = () => undefined, className = "", text }) => (
            <HeaderLink
              key={href}
              href={href}
              text={text}
              className={className}
              onClick={() => {
                setIsOpened(false);
                onClick();
              }}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
