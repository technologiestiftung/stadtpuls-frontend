import { FC } from "react";
import AddIcon from "@material-ui/icons/Add";
import ProjectIcon from "@material-ui/icons/FormatListBulleted";
import AccountIcon from "@material-ui/icons/AccountCircle";
import LogoutIconn from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import { useAuth } from "@auth/Auth";
import { DropdownMenu, DropdownMenuPropType } from "@components/DropdownMenu";
import { useUserData } from "@lib/hooks/useUserData";
import { UserAvatar } from "@components/UserAvatar";
import { AccountCircle } from "@material-ui/icons";

const iconProps = {
  className: "transition mr-2 group-hover:text-purple",
};

export const ColouredAuthLink: FC<{
  withAvatar?: boolean;
  variant: "primary" | "secondary";
  href?: string;
}> = ({ children, href, variant, withAvatar = false }) => {
  const iconStyles = [
    "icon transform -translate-y-0.5 transition inline-block align-middle mr-1",
    variant === "secondary" && "group-hover:text-green",
    variant === "primary" && "group-hover:opacity-60",
  ]
    .filter(Boolean)
    .join(" ");
  const textStyles = [
    "text inline-block ml-1 transition hidden sm:inline-block font-headline font-bold",
    variant === "secondary" && "group-hover:text-green",
    variant === "primary" && "font-semibold group-hover:text-green",
  ]
    .filter(Boolean)
    .join(" ");

  const text =
    typeof children === "string" ? (
      <>
        {withAvatar ? (
          <UserAvatar username={children} className={iconStyles} />
        ) : (
          <AccountCircle className={iconStyles} />
        )}
        <span className={textStyles}>{children}</span>
      </>
    ) : (
      <span />
    );
  return (
    <span className='group'>
      {href ? (
        <Link href={href}>
          <a href={href}>{text}</a>
        </Link>
      ) : (
        text
      )}
    </span>
  );
};

export const AuthLink: FC = () => {
  const { signOut } = useAuth();
  const { projects, user } = useUserData();

  const link = (
    <ColouredAuthLink
      withAvatar={!!user}
      href={user ? undefined : "/signin"}
      variant={user ? "primary" : "secondary"}
    >
      {user ? user.name || "Profil" : "Anmeldung"}
    </ColouredAuthLink>
  );

  return !user ? (
    link
  ) : (
    <DropdownMenu
      position='right'
      items={
        [
          {
            id: 0,
            title: (
              <>
                <AddIcon {...iconProps} /> Neues Projekt
              </>
            ),
            href: "/account/projects/new",
          },
          !!(projects && projects.length > 0) && {
            id: 1,
            title: (
              <>
                <ProjectIcon {...iconProps} /> Meine Projekte
              </>
            ),
            href: `/account/projects/${projects[0].id}`,
          },
          {
            id: 2,
            title: (
              <>
                <AccountIcon {...iconProps} /> Account
              </>
            ),
            href: "/account/profile",
          },
          {
            id: 3,
            title: (
              <>
                <LogoutIconn {...iconProps} /> Abmelden
              </>
            ),
            onClick: () => void signOut(),
          },
        ].filter(Boolean) as DropdownMenuPropType["items"]
      }
    >
      {link}
    </DropdownMenu>
  );
};
