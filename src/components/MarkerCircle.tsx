/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";

export const MarkerCircle: React.FC<{
  isActive: boolean;
  clickHandler?: () => void;
  children?: React.ReactNode;
}> = ({ isActive, clickHandler, children }) => {
  return (
    <div
      sx={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        bg: isActive ? "primary" : "mediumgrey",
        color: "background",
        textAlign: "center",
        transform: "translate(-12px, -12px)",
        cursor: clickHandler ? "pointer" : "default",
      }}
      onClick={() => (clickHandler ? clickHandler() : null)}
    >
      {children}
    </div>
  );
};
