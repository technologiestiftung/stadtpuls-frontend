import { BackLink } from "@components/SensorPageHeader";
import React, { FC } from "react";

const Map: FC = () => (
  <div
    className={[
      "md:absolute z-0 inset-0 bg-white bg-opacity-5",
      "grid md:grid-cols-2 h-80 md:h-auto",
    ].join(" ")}
  >
    <div className='absolute inset-0 bg-gray-100 animate-pulse z-10' />
    <div className='bg-white hidden md:block relative z-20' />
    <div className='relative z-30'>
      <div
        className={[
          "absolute inset-0 bg-left-bottom bg-no-repeat pointer-events-none",
          "bg-sensor-page-header-mobile bg-repeat-x",
          "md:bg-sensor-page-header md:bg-no-repeat",
        ].join(" ")}
      />
    </div>
  </div>
);

const Title: FC = () => (
  <h1 className='flex gap-3 mb-4 items-center'>
    <span className='w-7 h-7 bg-gray-100 animate-pulse rounded' />
    <span className='rounded h-7 bg-gray-100 block w-2/3 animate-pulse delay-75' />
  </h1>
);

export const SensorPageHeaderLoadingSkeleton: FC = () => {
  return (
    <div className='bg-white relative mt-[calc(-1*var(--headerHeight))]'>
      <Map />
      <div
        className={["container max-w-8xl", "mx-auto relative z-10"].join(" ")}
      >
        <aside className='md:w-1/2 bg-white px-4 py-8 md:py-40 md:pr-12 md:max-w-[560px]'>
          <BackLink />
          <Title />
          <div className='flex gap-4 items-center animate-pulse delay-100'>
            <span className='bg-gray-100 inline-block w-24 h-8 rounded' />
            <span className='inline-flex items-center gap-2'>
              <span className='bg-gray-100 inline-block w-7 h-7 rounded-full' />
              <span className='bg-gray-100 inline-block w-32 h-4 rounded' />
            </span>
          </div>
          <div className='py-8 flex flex-col gap-2 animate-pulse delay-200'>
            <span className='bg-gray-100 inline-block w-4/5 h-4 rounded' />
            <span className='bg-gray-100 inline-block w-3/5 h-4 rounded' />
          </div>
          <div className='flex flex-col gap-1 mb-8 animate-pulse delay-300'>
            <span className='bg-gray-100 animate-pulse inline-block w-24 h-4 rounded' />
            <span className='bg-gray-100 animate-pulse inline-block w-full h-10 rounded' />
          </div>
        </aside>
      </div>
    </div>
  );
};
