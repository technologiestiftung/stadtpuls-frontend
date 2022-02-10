import { FC } from "react";

export const SensorsListRowLoadingSkeleton: FC = () => (
  <li className='list-none'>
    <div
      className={[
        "flex flex-wrap xl:grid gap-2 xl:gap-8 p-4 xl:py-2",
        "xl:grid-cols-[5fr,2fr,2fr,120px]",
        "2xl:grid-cols-[5fr,2fr,2fr,140px]",
        "md:justify-between z-10 relative",
        "grid-cols-1 border border-gray-50",
        "relative md:items-center",
      ].join(" ")}
    >
      <div className='grid grid-cols-[24px,minmax(0,1fr)] w-full gap-3 items-center'>
        <span className='w-7 h-7 bg-gray-100 animate-pulse rounded' />
        <h3 className='pt-1 xl:pt-0 block xl:truncate'>
          <span className='rounded h-6 -mt-1 bg-gray-100 block w-1/2 animate-pulse delay-75' />
        </h3>
      </div>
      <p className='inline-grid xl:grid grid-cols-[16px,1fr] gap-2 items-center'>
        <span className='w-4 h-4 rounded-full bg-gray-100 animate-pulse delay-100' />
        <span className='inline-block truncate whitespace-nowrap mt-0.5'>
          <span className='rounded h-3.5 bg-gray-100 block w-20 xl:w-1/2 animate-pulse delay-100' />
        </span>
      </p>
      <p className='inline-grid xl:grid grid-cols-[16px,1fr] gap-2 items-center'>
        <span className='w-4 h-4 rounded-full bg-gray-100 animate-pulse delay-150' />
        <span className='inline-block truncate whitespace-nowrap mt-0.5'>
          <span className='rounded h-3.5 bg-gray-100 block w-16 xl:w-1/3 animate-pulse delay-150' />
        </span>
      </p>
      <div className='xl:hidden w-full flex-grow-0 flex flex-col gap-1'>
        <span className='rounded h-3.5 bg-gray-100 block w-4/5 animate-pulse delay-200' />
      </div>
      <div
        className={[
          "w-full xl:w-[140px] h-[72px] bg-gray-100 animate-pulse delay-300 rounded",
          "relative flex-shrink-0 flex-grow-0 justify-self-end",
        ].join(" ")}
      />
    </div>
  </li>
);
