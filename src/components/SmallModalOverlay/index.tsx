import { HTMLProps, FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SmallModal } from "@components/SmallModal";

interface SmallModalOverlayPropType extends HTMLProps<HTMLFormElement> {
  title: string;
  variant?: "dangerous" | "primary";
  footerContent?: ReactNode;
  className?: string;
  onClickOutside?: () => void;
}

export const SmallModalOverlay: FC<SmallModalOverlayPropType> = props => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    setContainer(document.querySelector("body"));
    document.querySelector("html")?.classList.add("no-scroll");
    return () => {
      document.querySelector("html")?.classList.remove("no-scroll");
    };
  }, [setContainer]);

  if (!container) return null;
  else
    return createPortal(
      <div
        className={[
          "fixed top-0 left-0 bg-black bg-opacity-50",
          "w-screen h-full sm:flex items-center justify-center z-50",
          "p-4",
        ].join(" ")}
      >
        <SmallModal {...props} />
      </div>,
      container
    );
};
