/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from "react";
import { jsx } from "theme-ui";

export const MarkerCircle: FC<{
  isActive: boolean;
  clickHandler?: () => void;
}> = ({ isActive, clickHandler, children }) => {
  return (
    <button
      sx={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        bg: isActive ? "primary" : "mediumgrey",
        color: "background",
        textAlign: "center",
        transform: "translate(-12px, -12px)",
        cursor: clickHandler ? "pointer" : "default",
        border: "none",
      }}
      onClick={() => (clickHandler ? clickHandler() : null)}
    >
      {children}
    </button>
  );
};
