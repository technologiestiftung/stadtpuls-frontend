import { FC } from "react";
import Link from "next/link";
import colors from "../../style/colors";

interface TabPropType {
  id: string;
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
}

export interface TabsPropType {
  tabs: TabPropType[];
  activeTabIndex?: number;
  tabPanelId: string;
}

const getTabInnerStyles = (isActive: boolean): string =>
  [
    "px-4 sm:px-5 py-2 sm:py-3 transition-all text-sm sm:text-base",
    "flex content-center items-center z-0 focus:outline-none",
    "border-l border-t border-r bg-none ring-inset",
    "border-b-0 ml-[-1px] inline-block relative",
    !isActive && "hover:border-purple hover:text-purple",
    !isActive && "cursor-pointer hover:z-20 border-gray-50 text-gray-900",
    !isActive && "focus:z-20 focus:border-purple",
    !isActive && "focus:ring-2 focus:ring-purple",
    isActive && "border-gray-200 z-10 cursor-default bg-white",
  ]
    .filter(Boolean)
    .join(" ");
export const Tabs: FC<TabsPropType> = ({
  tabs,
  tabPanelId,
  activeTabIndex = 0,
}) => (
  <nav>
    <ul
      role='tablist'
      className='flex pl-[1px] max-w-full overflow-x-auto overflow-y-hidden ring-inset'
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTabIndex === idx;
        const tabIndex = (isActive && -1) || undefined;
        const { id, name, onClick, href } = tab;
        const tabInnerStyles = getTabInnerStyles(isActive);
        let tag = (
          <button
            role='tab'
            aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
            aria-controls={tabPanelId}
            id={id}
            onClick={onClick || (() => undefined)}
            className={tabInnerStyles}
            tabIndex={tabIndex}
          >
            {name}
          </button>
        );
        if (href) {
          tag = (
            <Link href={href}>
              <a
                role='tab'
                aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
                aria-controls={tabPanelId}
                href={href}
                className={tabInnerStyles}
                tabIndex={tabIndex}
              >
                {name}
              </a>
            </Link>
          );
        }
        if (isActive) {
          tag = (
            <span
              role='tab'
              aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
              aria-controls={tabPanelId}
              className={tabInnerStyles}
            >
              {name}
            </span>
          );
        }
        return (
          <li
            key={id}
            className={[].join(" ")}
            style={{
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: isActive ? colors.white : "transparent",
            }}
          >
            {tag}
          </li>
        );
      })}
    </ul>
  </nav>
);
