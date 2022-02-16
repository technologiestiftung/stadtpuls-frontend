import { FC } from "react";
import { useWindowSize } from "@lib/hooks/useWindowSize";

export const AccoundCardLoadingSkeleton: FC = () => {
  const { width: windowWidth } = useWindowSize();
  const isSm = windowWidth && windowWidth < 640;
  const isMd = windowWidth && windowWidth >= 640 && windowWidth < 768;
  const avatarSize = isSm ? 32 : isMd ? 40 : 48;
  return (
    <div
      className={[
        "group border border-gray-100 bg-white shadow",
        "flex gap-x-3 sm:gap-x-4 md:gap-x-5",
        "py-4 sm:py-5 md:py-6",
        "px-4 sm:px-5 md:px-6",
      ].join(" ")}
    >
      <div className='flex-grow-0'>
        <span
          className='bg-gray-100 animate-pulse block rounded-full'
          style={{ width: avatarSize, height: avatarSize }}
        />
      </div>
      <div className='flex-grow group-hover:animate-textpulse'>
        <h4
          className={[
            "leading-tight sm:leading-tight md:leading-tight",
            "font-bold text-lg sm:text-xl md:text-2xl font-headline",
          ].join(" ")}
        >
          <span className='rounded h-6 -mt-1 bg-gray-100 block w-1/2 animate-pulse delay-75' />
        </h4>
        <span className='w-4 h-4 rounded-full bg-gray-100 animate-pulse delay-150 inline-block mr-1' />
        <span className='rounded h-3.5 bg-gray-100 block w-16 xl:w-1/3 animate-pulse delay-150' />
        <p className='pt-2 flex flex-col gap-1'>
          <span className='rounded h-3.5 bg-gray-100 block w-4/5 animate-pulse delay-200' />
          <span className='rounded h-3.5 bg-gray-100 block w-3/5 animate-pulse delay-200' />
        </p>
        <div className='flex gap-4 sm:gap-6 md:gap-8 justify-self-end items-center pt-6'>
          <div className='flex flex-col'>
            <span
              className={[
                "text-lg sm:text-xl pt-1",
                "leading-snug sm:leading-snug",
                "font-mono text-gray-700",
                "mb-1",
              ].join(" ")}
            >
              <span className='rounded h-6 bg-gray-100 block w-6 animate-pulse delay-300' />
            </span>
            <span className='rounded h-3.5 bg-gray-100 block w-14 animate-pulse delay-300' />
          </div>
          <div className='flex flex-col'>
            <span
              className={[
                "text-lg sm:text-xl pt-1",
                "leading-snug sm:leading-snug",
                "font-mono text-gray-700",
                "mb-1",
              ].join(" ")}
            >
              <span className='rounded h-6 bg-gray-100 block w-6 animate-pulse delay-400' />
            </span>
            <span className='rounded h-3.5 bg-gray-100 block w-14 animate-pulse delay-400' />
          </div>
        </div>
      </div>
      <div className='flex flex-col-reverse flex-grow-0 text-gray-500 group-hover:animate-textpulse' />
    </div>
  );
};
