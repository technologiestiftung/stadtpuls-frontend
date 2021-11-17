import useClickOutside from "@lib/hooks/useClickOutside";
import { FC, ReactNode, useState } from "react";

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useClickOutside<HTMLButtonElement>(() => setIsVisible(false));
  const dropdownStyles = [
    "absolute top-full left-0 transform transition whitespace-nowrap pt-3",
    "w-auto max-width-md transform-y-4",
    position === "right" && "-translate-x-3/4",
    !isVisible && "opacity-0 pointer-events-none",
    isVisible && "transform-y-0 opacity-100 pointer-events-all",
  ]
    .filter(Boolean)
    .join(" ");
  const caretStyles = [
    "absolute top-full left-1 w-3 h-3 bg-white border border-gray-200 shadow transition",
    "transform rotate-45 translate-y-2",
    isVisible ? "opacity-100" : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className='inline-block relative'>
      <button
        className={[
          buttonClassNames,
          "cursor-pointer",
          "focus:ring-2 focus:outline-none focus:ring-green",
        ].join(" ")}
        onClick={evt => {
          evt.preventDefault();
          evt.stopPropagation();
          setIsVisible(!isVisible);
        }}
        ref={ref}
      >
        {children}
      </button>
      <span aria-hidden className={caretStyles} />
      <section className={dropdownStyles}>
        <div className='bg-white border border-gray-200 shadow'>
          {dropdownContent}
        </div>
      </section>
    </div>
  );
};
