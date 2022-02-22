import { useWindowSize } from "@lib/hooks/useWindowSize";
import { FC } from "react";

export const UserInfoLoadingSkeleton: FC = () => {
  const { width: windowWidth } = useWindowSize();
  const avatarSize = windowWidth && windowWidth > 640 ? 80 : 48;
  return (
    <header className='pt-8 pb-16 sm:pb-20 md:pb-28'>
      <div
        className={[
          "flex flex-wrap md:flex-nowrap",
          "gap-4 sm:gap-6 md:gap-8",
          "relative pl-16 sm:pl-24 md:pl-28",
        ].join(" ")}
      >
        <div className='absolute top-0 left-0'>
          <span
            className='inline-block bg-gray-100 rounded-full animate-pulse'
            style={{
              width: `${avatarSize}px`,
              height: `${avatarSize}px`,
            }}
          />
        </div>
        <div className='flex-grow flex flex-wrap gap-x-6 gap-y-0'>
          <h1 className='w-full order-1 pt-1 sm:pt-0 animate-pulse'>
            <span className='bg-gray-100 inline-block w-96 max-w-full h-7 rounded' />
          </h1>
          <div className='w-full mt-3 order-3 sm:order-2 animate-pulse delay-75'>
            <p className='max-w-prose text-sm sm:text-base'>
              <span className='bg-gray-100 inline-block w-4/5 h-4 rounded' />
              <span className='bg-gray-100 inline-block w-3/5 h-4 rounded' />
            </p>
          </div>
          <span className='inline-block order-2 sm:order-3 mt-0 sm:mt-3'>
            <span className='bg-gray-100 inline-block w-24 h-4 rounded animate-pulse delay-100' />
          </span>
          <div className='order-4 sm:order-5 mt-3 bg-gray-100 w-3/5 h-4 rounded animate-pulse delay-200' />
        </div>
        <div className='md:mt-12 self-start flex flex-wrap md:flex-nowrap gap-4 sm:gap-8 justify-self-end items-center'>
          <span className='inline-flex flex-col gap-2 animate-pulse delay-300'>
            <span className='bg-gray-100 inline-block w-7 h-7 rounded' />
            <span className='bg-gray-100 inline-block w-20 h-4 rounded' />
          </span>
          <span className='inline-flex flex-col gap-2 animate-pulse delay-400'>
            <span className='bg-gray-100 inline-block w-7 h-7 rounded' />
            <span className='bg-gray-100 inline-block w-24 h-4 rounded' />
          </span>
        </div>
      </div>
    </header>
  );
};
