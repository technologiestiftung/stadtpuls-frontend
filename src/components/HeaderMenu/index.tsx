import { ActiveLink } from "@components/ActiveLink";
import useClickOutside from "@lib/hooks/useClickOutside";
import { Close, Menu } from "@material-ui/icons";
import { FC, useState } from "react";

interface MenuPageType {
  href: string;
  text: string;
}

interface MenuLinkPropType extends MenuPageType {
  className?: string;
}

const pages: MenuPageType[] = [
  { href: "/projects", text: "Projekte" },
  { href: "/docs", text: "Dokumentation" },
];

const HeaderLink: FC<MenuLinkPropType> = ({ text, href, className = "" }) => (
  <li className={`${className} sm:inline-block text-xl sm:text-base`}>
    <ActiveLink
      activeClassName='font-bold text-blue-500 cursor-default'
      href={href}
    >
      <a
        href={href}
        className={[
          "hover:text-blue-500 transition",
          "p-4 sm:p-0 block sm:inline",
        ].join(" ")}
      >
        {text}
      </a>
    </ActiveLink>
  </li>
);

export const HeaderMenu: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggleIsOpened = (): void => setIsOpened(!isOpened);
  const menuRef = useClickOutside(() => setIsOpened(false));
  return (
    <>
      <button
        className='sm:hidden text-blue-500 focus-offset'
        onClick={toggleIsOpened}
      >
        {isOpened ? <Close /> : <Menu />}
      </button>
      <nav
        ref={menuRef}
        className={[
          "fixed sm:static",
          "top-16 sm:top-auto",
          "left-0 sm:left-auto",
          "z-10 sm:z-auto",
          "w-full sm:w-auto",
          "shadow-xl sm:shadow-none",
          "py-4 px-1 sm:p-0",
          "bg-gray-50 sm:bg-white",
          "border-t border-gray-200 sm:border-none",
          "transition",
          !isOpened
            ? "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto"
            : "",
        ].join(" ")}
      >
        <ul
          className={[
            "h-full sm:w-auto",
            "sm:flex sm:gap-8 text-gray-500 sm:mr-4",
          ].join(" ")}
        >
          <HeaderLink href='/' text='Startseite' className='sm:hidden' />
          {pages.map(({ href, text }) => (
            <HeaderLink key={href} href={href} text={text} />
          ))}
        </ul>
      </nav>
    </>
  );
};
