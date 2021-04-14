import useClickOutside from "@lib/onClickOutsideHook";
import { FC, ReactNode, useState } from "react";

interface DropdownPropType {
  dropdownContent: ReactNode | ReactNode[];
}

export const Dropdown: FC<DropdownPropType> = ({
  children,
  dropdownContent,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useClickOutside<HTMLButtonElement>(() => setIsVisible(false));
  const dropdownStyles = [
    "absolute top-full left-0 transform transition whitespace-nowrap pt-3",
    "w-auto max-width-md transform-y-4 opacity-0",
    !isVisible && "pointer-events-none",
    isVisible && "transform-y-0 opacity-100 pointer-events-all",
  ]
    .filter(Boolean)
    .join(" ");
  const caretStyles = [
    "absolute top-full left-1 w-3 h-3 bg-white shadow transition",
    "transform rotate-45 translate-y-2 opacity-0",
    isVisible ? "opacity-100" : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className='inline-block relative'>
      <button
        className='cursor-pointer rounded-none focus-offset'
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
        <div className='bg-white shadow-md'>{dropdownContent}</div>
      </section>
    </div>
  );
};
