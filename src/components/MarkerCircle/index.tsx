import { FC } from "react";

export const MarkerCircle: FC<{
  isActive: boolean;
  clickHandler?: () => void;
}> = ({ isActive, clickHandler, children }) => {
  return (
    <div className='w-6 h-6 flex'>
      <div className='motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-90'></div>
      <button
        className={[
          "relative inline-flex",
          "w-6 h-6 rounded-full",
          `${isActive ? "bg-blue" : "bg-gray-500"} border-white border-2`,
          "text-center",
          `${clickHandler ? "cursor-pointer" : "cursor-default"}`,
        ].join(" ")}
        onClick={() => (clickHandler ? clickHandler() : null)}
      >
        {children}
      </button>
    </div>
  );
};
