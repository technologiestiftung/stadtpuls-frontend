import { Dropdown } from "@components/Dropdown";
import Link from "next/link";
import { FC, HTMLProps, ReactNode } from "react";

interface ItemType {
  id: string | number;
  title: ReactNode;
  disabled?: boolean;
}

interface HrefItemType extends ItemType {
  href: string;
}

interface OnclickItemType extends ItemType {
  onClick: HTMLProps<HTMLButtonElement>["onClick"];
}

type DropdownItemType = HrefItemType | OnclickItemType;

export interface DropdownMenuPropType {
  items: DropdownItemType[];
  position?: "right" | "left";
  buttonClassNames?: string;
}

const getItemStyles = (
  { disabled }: ItemType,
  defaultClassNames = ""
): string =>
  [
    "group",
    "block w-full last:border-b-0",
    "px-4 py-3 transition text-left border-b border-gray-100",
    !disabled &&
      "hover:bg-purple hover:bg-opacity-5 text-purple cursor-pointer",
    disabled && "bg-gray-50 text-gray-700 cursor-not-allowed",
    defaultClassNames,
  ]
    .filter(Boolean)
    .join(" ");

export const DropdownMenu: FC<DropdownMenuPropType> = ({
  children,
  items,
  position = "left",
  buttonClassNames = "",
}) => (
  <Dropdown
    position={position}
    buttonClassNames={buttonClassNames}
    dropdownContent={items.map(item => {
      const menuItemStyles = getItemStyles(item);
      if (item.disabled) {
        return (
          <span key={item.id} className={menuItemStyles}>
            {item.title}
          </span>
        );
      }
      if ("href" in item) {
        return (
          <Link key={item.id} href={item.href}>
            <a className={menuItemStyles}>{item.title}</a>
          </Link>
        );
      }
      return (
        <button onClick={item.onClick} key={item.id} className={menuItemStyles}>
          {item.title}
        </button>
      );
    })}
  >
    {children}
  </Dropdown>
);
