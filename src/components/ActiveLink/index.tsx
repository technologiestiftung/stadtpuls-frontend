import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import React, { Children, FC, HTMLProps, ReactElement } from "react";

interface ActiveLinkPropType extends HTMLProps<HTMLAnchorElement> {
  children: ReactElement<HTMLAnchorElement>;
  activeClassName: string;
  href: string;
}

export const ActiveLink: FC<ActiveLinkPropType> = ({
  children,
  activeClassName,
  href,
  ...props
}) => {
  const router = useRouter();
  const { asPath } = router || {};
  const child = Children.only(children) as ReactElement<HTMLAnchorElement>;
  const childClassName = child.props.className || "";

  const className =
    asPath && (asPath === href || asPath === props.as)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, {
        className: className || "",
      })}
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
};
