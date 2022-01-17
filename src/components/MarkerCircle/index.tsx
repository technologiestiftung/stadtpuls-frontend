import { FC } from "react";

export interface MarkerCirclePropType {
  isActive?: boolean;
  isPulsating?: boolean;
  isHighlighted?: boolean;
  clickHandler?: () => void;
  mouseEnterHandler?: () => void;
  mouseLeaveHandler?: () => void;
}

export const MarkerCircle: FC<MarkerCirclePropType> = ({
  isActive = false,
  isPulsating = false,
  isHighlighted = false,
  clickHandler,
  mouseEnterHandler,
  mouseLeaveHandler,
  children,
}) => {
  const isInteractive = clickHandler || mouseEnterHandler || mouseLeaveHandler;
  const sizeClass = children ? "min-w-7 h-7" : "min-w-5 h-5";
  return (
    <div className={`${sizeClass} relative`}>
      {isPulsating && (
        <div
          className={[
            "motion-safe:animate-ping absolute -top-1/2 -left-1/2",
            "h-full w-full rounded-full bg-green opacity-90",
          ].join(" ")}
        />
      )}
      <button
        className={[
          "relative rounded-full inline-flex",
          sizeClass,
          isActive && !isHighlighted && "bg-blue text-white",
          isHighlighted && "bg-green text-blue",
          !isActive && !isHighlighted && "bg-gray-400 text-white",
          isInteractive && "hover:bg-green hover:text-blue",
          "border-white border-2",
          "text-center transition-colors",
          "-translate-x-1/2 -translate-y-1/2",
          `${isInteractive ? "cursor-pointer" : "cursor-default"}`,
          "place-items-center place-content-center",
          "text-sm font-monospace px-2",
        ].join(" ")}
        onClick={() => (clickHandler ? clickHandler() : null)}
        onMouseEnter={() => (mouseEnterHandler ? mouseEnterHandler() : null)}
        onMouseLeave={() => (mouseLeaveHandler ? mouseLeaveHandler() : null)}
      >
        {children}
      </button>
    </div>
  );
};
