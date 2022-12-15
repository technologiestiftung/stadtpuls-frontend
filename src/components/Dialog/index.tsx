import { Dialog as HUIDialog } from "@headlessui/react";
import { FC, MutableRefObject, ReactNode, useEffect } from "react";

export interface DialogPropsType {
  title?: string;
  className?: string;
  modalClassName?: string;
  contentClassName?: string;
  variant?: "dangerous" | "primary";
  footerContent: ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  initialFocus?: MutableRefObject<HTMLElement | null>;
  description?: ReactNode;
  children?: ReactNode;
}

export const Dialog: FC<DialogPropsType> = ({
  title,
  children,
  footerContent,
  variant,
  className = "max-w-md",
  modalClassName = "border-gray-200 bg-white",
  contentClassName = "prose",
  isOpen = true,
  setIsOpen = () => undefined,
  initialFocus,
  description,
}) => {
  useEffect(() => {
    isOpen && document.querySelector("html")?.classList.add("no-scroll");
    !isOpen && document.querySelector("html")?.classList.remove("no-scroll");
    return () => {
      document.querySelector("html")?.classList.remove("no-scroll");
    };
  }, [isOpen]);

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
          className={`${modalClassName} border shadow p-4 sm:p-8 flex flex-col gap-8 place-content-between`}
          style={{ minHeight: 360 }}
        >
          <div>
            {title && (
              <HUIDialog.Title
                className={`text-3xl font-bold font-headline m-0 mb-4 ${
                  variant == "dangerous" ? "text-error" : "text-purple"
                }`}
              >
                {title}
              </HUIDialog.Title>
            )}
            <div className={contentClassName}>
              {description && (
                <HUIDialog.Description>{description}</HUIDialog.Description>
              )}
              {children}
            </div>
          </div>
          <div className='flex gap-4 place-content-between'>
            {footerContent}
          </div>
        </div>
      </div>
    </HUIDialog>
  );
};
