import { FC } from "react";

export const MarkerCircle: FC<{
  isActive: boolean;
  clickHandler?: () => void;
}> = ({ isActive, clickHandler, children }) => {
  return (
    <div className='w-6 h-6 flex'>
      <div className='motion-safe:animate-ping absolute -top-3 -left-3 inline-flex h-full w-full rounded-full bg-green opacity-90'></div>
      <button
        className={[
          "relative inline-flex",
          "w-6 h-6 rounded-full",
          `${isActive ? "bg-blue" : "bg-gray-500"} border-white border-2`,
          "text-center",
          "-translate-x-3 -translate-y-3",
          `${clickHandler ? "cursor-pointer" : "cursor-default"}`,
        ].join(" ")}
        onClick={() => (clickHandler ? clickHandler() : null)}
      >
        {children}
      </button>
    </div>
  );
};
