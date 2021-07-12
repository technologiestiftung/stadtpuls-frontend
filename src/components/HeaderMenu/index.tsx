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
  onClick: () => void;
}

const pages: MenuPageType[] = [
  { href: "/projects", text: "Projekte" },
  { href: "/docs", text: "Mehr Infos" },
];

const HeaderLink: FC<MenuLinkPropType> = ({
  text,
  href,
  className = "",
  onClick,
}) => (
  <li className={`${className} sm:inline-block text-xl sm:text-base`}>
    <ActiveLink activeClassName='navigation-link-active' href={href}>
      <a
        href={href}
        className='navigation-link p-4 block sm:inline'
        onClick={onClick}
      >
        {text}
      </a>
    </ActiveLink>
  </li>
);

export const HeaderMenu: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggleIsOpened = (): void => setIsOpened(!isOpened);
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpened(false));
  return (
    <div ref={menuRef}>
      <button
        className='sm:hidden text-blue focus-offset relative z-0'
        onClick={toggleIsOpened}
      >
        {isOpened ? <Close /> : <Menu />}
      </button>
      <nav
        className={[
          "fixed sm:static",
          "top-16 sm:top-auto",
          "left-0 sm:left-auto",
          "z-20 sm:z-auto",
          "w-full sm:w-auto",
          "shadow sm:shadow-none",
          "py-4 px-1 sm:p-0",
          "bg-gray-50 sm:bg-white",
          "border-t border-gray-200 sm:border-none",
          "transition",
          !isOpened
            ? "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto"
            : "",
        ].join(" ")}
      >
        <ul className='h-full sm:w-auto sm:flex sm:gap-8 sm:mr-4'>
          <HeaderLink
            href='/'
            text='Startseite'
            className='sm:hidden'
            onClick={() => setIsOpened(false)}
          />
          {pages.map(({ href, text }) => (
            <HeaderLink
              key={href}
              href={href}
              text={text}
              onClick={() => setIsOpened(false)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
