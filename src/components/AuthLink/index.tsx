import { FC } from "react";
import Link from "next/link";
import { useAuth } from "@auth/Auth";
import { UserAvatar } from "@components/UserAvatar";
import ArrowIntoDoor from "../../../public/images/icons/16px/arrowIntoDoor.svg";
import ArrowOutOfDoor from "../../../public/images/icons/16px/arrowOutOfDoor.svg";

interface AuthLinkPropType {
  loggedInUserName?: string;
}

export const AuthLink: FC<AuthLinkPropType> = ({ loggedInUserName }) => {
  const { signOut } = useAuth();

  const iconStyles = [
    "icon transform -translate-y-0.5 transition inline-block",
    "align-middle group-hover:text-green",
  ].join(" ");
  const textStyles = [
    "text gap-2 transition items-center",
    "font-headline font-semibold group-hover:text-green",
  ].join(" ");
  const accountHref = `/${loggedInUserName || "anonymous"}/sensors`;

  return (
    <span className='inline-flex items-center gap-6'>
      {loggedInUserName ? (
        <>
          <Link href={accountHref}>
            <a href={accountHref}>
              <UserAvatar
                username={loggedInUserName}
                className={iconStyles}
                size={32}
              />
            </a>
          </Link>
          <button
            className={["hidden lg:inline-flex", textStyles].join(" ")}
            onClick={() => signOut()}
          >
            <ArrowOutOfDoor />
            Logout
          </button>
        </>
      ) : (
        <Link href='/signin'>
          <a href='/signin' className={["inline-flex", textStyles].join(" ")}>
            <ArrowIntoDoor />
            <span className='hidden xs:inline-block'>Login</span>
          </a>
        </Link>
      )}
    </span>
  );
};
