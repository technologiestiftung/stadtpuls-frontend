import { FC } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import { useAuth } from "@auth/Auth";
import { DropdownMenu, DropdownMenuPropType } from "@components/DropdownMenu";
import { useUserData } from "@lib/hooks/useUserData";

export const ColouredAuthLink: FC<{
  variant: "primary" | "secondary";
  href?: string;
}> = ({ children, href, variant }) => {
  const iconStyles = [
    "transform -translate-y-0.5 transition inline-block",
    variant === "secondary" && "text-gray-400 group-hover:text-blue-500",
    variant === "primary" && "text-blue-500 group-hover:opacity-60",
  ]
    .filter(Boolean)
    .join(" ");
  const textStyles = [
    "inline-block ml-1 transition",
    variant === "secondary" && "text-black group-hover:text-blue-500",
    variant === "primary" &&
      "text-blue-500 font-semibold group-hover:opacity-60",
  ]
    .filter(Boolean)
    .join(" ");

  const text = (
    <>
      <span className={iconStyles}>
        <AccountCircle />
      </span>
      <span className={textStyles}>{children}</span>
    </>
  );
  return href ? (
    <Link href={href}>
      <a href={href} className='group'>
        {text}
      </a>
    </Link>
  ) : (
    text
  );
};

export const AuthLink: FC = () => {
  const { authenticatedUser, signOut } = useAuth();
  const { projects } = useUserData();

  const link = (
    <ColouredAuthLink
      href={authenticatedUser ? undefined : "/signin"}
      variant={authenticatedUser ? "primary" : "secondary"}
    >
      {authenticatedUser ? authenticatedUser.email || "Profile" : "Anmeldung"}
    </ColouredAuthLink>
  );

  return !authenticatedUser ? (
    link
  ) : (
    <DropdownMenu
      items={
        [
          { id: 0, title: "Neues Projekt", href: "/account/projects/new" },
          !!(projects && projects.length > 0) && {
            id: 1,
            title: "Meine Projekte",
            href: `/account/projects/${projects[0].id}`,
          },
          { id: 2, title: "Account", href: "/account/profile" },
          { id: 3, title: "Logout", onClick: () => void signOut() },
        ].filter(Boolean) as DropdownMenuPropType["items"]
      }
    >
      {link}
    </DropdownMenu>
  );
};
