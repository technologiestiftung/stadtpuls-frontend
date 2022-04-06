import { Dialog as HUIDialog } from "@headlessui/react";
import { FC, MutableRefObject, ReactNode, useEffect } from "react";

export interface DialogPropsType {
  title: string;
  className?: string;
  variant?: "dangerous" | "primary";
  footerContent: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  initialFocus?: MutableRefObject<HTMLElement | null>;
  description?: string;
  children?: ReactNode;
}

export const Dialog: FC<DialogPropsType> = ({
  title,
  children,
  footerContent,
  variant,
  className = "max-w-md",
  isOpen = true,
  setIsOpen = () => undefined,
  initialFocus,
  description,
}) => {
  useEffect(() => {
    document.querySelector("html")?.classList.add("no-scroll");
    return () => {
      document.querySelector("html")?.classList.remove("no-scroll");
    };
  }, []);

  return (
    <HUIDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      initialFocus={initialFocus}
      className={`fixed inset-0 sm:flex items-center justify-center z-50`}
    >
      <HUIDialog.Overlay
        className={[
          "fixed inset-0 bg-black bg-opacity-50",
          "sm:flex items-center justify-center",
        ].join(" ")}
      />
      <div
        className={`${className} md:px-0 h-full overflow-y-auto p-4 relative z-10`}
      >
        <div
          className='bg-white border border-gray-200 shadow p-4 sm:p-8 flex flex-col gap-8 place-content-between'
          style={{ minHeight: 360 }}
        >
          <div>
            <HUIDialog.Title
              className={`text-3xl font-bold font-headline m-0 mb-4 ${
                variant == "dangerous" ? "text-error" : "text-purple"
              }`}
            >
              {title}
            </HUIDialog.Title>
            {description && (
              <HUIDialog.Description>{description}</HUIDialog.Description>
            )}
            {children}
          </div>
          <div className='flex gap-4 place-content-between'>
            {footerContent}
          </div>
        </div>
      </div>
    </HUIDialog>
  );
};
