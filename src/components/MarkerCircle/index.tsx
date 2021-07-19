import { FC } from "react";

export const MarkerCircle: FC<{
  isActive: boolean;
  clickHandler?: () => void;
}> = ({ isActive, clickHandler, children }) => {
  return (
    <button
      className={[
        "w-6 h-6 rounded-full",
        `${isActive ? "bg-blue" : "bg-gray-500"}`,
        "text-center",
        "-translate-x-3 -translate-y-3",
        `${clickHandler ? "cursor-pointer" : "cursor-default"}`,
      ].join(" ")}
      onClick={() => (clickHandler ? clickHandler() : null)}
    >
      {children}
    </button>
  );
};
