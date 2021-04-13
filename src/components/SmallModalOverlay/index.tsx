import { HTMLProps, FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SmallModal } from "@components/SmallModal";

interface SmallModalOverlayPropType extends HTMLProps<HTMLFormElement> {
  title: string;
  variant?: "dangerous" | "primary";
  footerContent?: ReactNode;
}

export const SmallModalOverlay: FC<SmallModalOverlayPropType> = props => {
  const [container, setContainer] = useState<Element | null>(null);
  useEffect(() => {
    setContainer(document.querySelector("body"));
  });

  if (!container) return null;
  else
    return createPortal(
      <div className='fixed top-0 left-0 bg-black bg-opacity-50 z-10 w-screen h-screen flex items-center justify-center'>
        <SmallModal {...props} />
      </div>,
      container
    );
};
