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
    "absolute top-full left-0 transform transition whitespace-nowrap",
    "w-auto max-width-md transform-y-4 opacity-0",
    !isVisible && "pointer-events-none",
    isVisible && "transform-y-0 opacity-100 pointer-events-all",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      className='inline-block relative cursor-pointer rounded-none focus-offset'
      onClick={() => setIsVisible(!isVisible)}
      ref={ref}
    >
      {children}
      <section className={dropdownStyles}>
        <div className='bg-white shadow-md'>{dropdownContent}</div>
      </section>
    </button>
  );
};
