import useClickOutside from "@lib/hooks/useClickOutside";
import { Children, FC, ReactNode, useState } from "react";

interface DropdownPropType {
  dropdownContent: ReactNode | ReactNode[];
  position?: "left" | "right";
  buttonClassNames?: string;
}

export const Dropdown: FC<DropdownPropType> = ({
  children,
  dropdownContent,
  position = "left",
  buttonClassNames = "",
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpened(false));
  const isVisible = Boolean(isOpened && Children.count(dropdownContent) > 0);
  const dropdownStyles = [
    "absolute top-full transform transition whitespace-nowrap pt-3",
    "w-auto max-width-md transform-y-4 transform-x-3 z-10",
    position === "right" ? "right-0" : "left-0",
    !isVisible && "opacity-0 pointer-events-none",
    isVisible && "transform-y-0 opacity-100 pointer-events-all",
  ]
    .filter(Boolean)
    .join(" ");
  const caretStyles = [
    "absolute top-full w-3 h-3 bg-white border border-gray-200 shadow transition",
    "transform -translate-x-1/2 rotate-45 translate-y-2 left-1/2",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className='inline-block relative' ref={ref}>
      <button
        className={[
          buttonClassNames,
          "cursor-pointer",
          "focus:ring-2 focus:outline-none focus:ring-green",
        ].join(" ")}
        onClick={evt => {
          evt.preventDefault();
          evt.stopPropagation();
          setIsOpened(!isOpened);
        }}
      >
        {children}
      </button>
      {isVisible && <span aria-hidden className={caretStyles} />}
      <section className={dropdownStyles}>
        <div className='bg-white border border-gray-200 shadow'>
          {dropdownContent}
        </div>
      </section>
    </div>
  );
};
