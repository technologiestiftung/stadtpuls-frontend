import { FC } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import { useAuth } from "@auth/Auth";

export const ColouredAuthLink: FC<{
  variant: "primary" | "secondary";
  href: string;
}> = ({ children, href, variant }) => {
  const iconStyles = [
    "transform -translate-y-0.5 transition inline-block",
    variant === "secondary" && "text-gray-400 group-hover:text-primary",
    variant === "primary" && "text-primary group-hover:opacity-60",
  ]
    .filter(Boolean)
    .join(" ");
  const textStyles = [
    "inline-block ml-1 transition",
    variant === "secondary" && "text-black group-hover:text-primary",
    variant === "primary" &&
      "text-primary font-semibold group-hover:opacity-60",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={href}>
      <a href={href} className='group'>
        <span className={iconStyles}>
          <AccountCircle />
        </span>
        <span className={textStyles}>{children}</span>
      </a>
    </Link>
  );
};

export const AuthLink: FC = () => {
  const { authenticatedUser } = useAuth();

  return (
    <ColouredAuthLink
      href={authenticatedUser ? "/user" : "/signin"}
      variant={authenticatedUser ? "primary" : "secondary"}
    >
      {authenticatedUser ? authenticatedUser.email || "Profile" : "Anmeldung"}
    </ColouredAuthLink>
  );
};
