import { Dropdown } from "@components/Dropdown";
import Link from "next/link";
import { FC, HTMLProps, ReactNode } from "react";

interface ItemType {
  id: string | number;
  title: ReactNode;
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
}

export const DropdownMenu: FC<DropdownMenuPropType> = ({
  children,
  items,
  position = "left",
}) => {
  const menuItemStyles = [
    "group",
    "block w-full text-black",
    "px-4 py-1.5 cursor-pointer transition text-left",
    "hover:bg-blue-50 hover:text-blue-500",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Dropdown
      position={position}
      dropdownContent={
        <div className='py-2'>
          {items.map(item => {
            return "href" in item ? (
              <Link key={item.href} href={item.href}>
                <a className={menuItemStyles}>{item.title}</a>
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                key={item.id}
                className={menuItemStyles}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      }
    >
      {children}
    </Dropdown>
  );
};
