import { CircularProgressBar } from "@components/CircularProgressBar";
import { DropdownMenu } from "@components/DropdownMenu";
import { DownloadQueueType } from "@lib/hooks/useDownloadQueue";
import ArrowDownWithHalfSquare from "../../../public/images/icons/16px/arrowDownWithHalfSquare.svg";
import { FC } from "react";

interface DownloadQueueButtonPropType {
  queue?: DownloadQueueType;
}

export const DownloadQueueButton: FC<DownloadQueueButtonPropType> = ({
  queue = {},
}) => {
  const queueArray = Object.values(queue).filter(Boolean);
  const isVisible = queueArray.length > 0;
  const progressTotal = queueArray.reduce(
    (acc, curr) => acc + curr.progress,
    0
  );
  const progress = Math.round(progressTotal / queueArray.length);

  return (
    <DropdownMenu
      position='right'
      items={queueArray.map(({ id, title, progress }) => ({
        id,
        title: (
          <span className='flex gap-8 items-center content-center'>
            <span>{title}</span>
            <span className='flex gap-2 items-center content-center'>
              <span className='h-1 rounded w-10 bg-gray-100 inline-block relative'>
                <span
                  className={[
                    "rounded h-1 bg-purple inline-block absolute top-0 left-0",
                    "transition-all",
                  ].join(" ")}
                  style={{ width: `${progress}%` }}
                />
              </span>
              <span className='ml-1 text-xs leading-[10px] font-mono text-gray-400'>
                {progress}%
              </span>
            </span>
          </span>
        ),
        href: `/sensors/${id}`,
      }))}
      buttonClassNames='hover:bg-gray-50 transition-all rounded-full transform hover:scale-110 active:scale-90'
    >
      <span
        className={[
          "relative h-10 overflow-hidden",
          "transition-all float-left group",
          isVisible ? "w-10" : "w-0",
        ].join(" ")}
        aria-hidden={!isVisible}
      >
        <div
          className={[
            "w-10 h-10 absolute top-0 left-0 transform",
            "transition-all",
            isVisible
              ? "translate-x-0 opacity-100 delay-0"
              : "-translate-x-full opacity-0 delay-100",
          ].join(" ")}
        >
          <CircularProgressBar percentage={progress}>
            <span className='text-blue group-hover:text-purple transition-colors'>
              <ArrowDownWithHalfSquare />
            </span>
          </CircularProgressBar>
        </div>
      </span>
    </DropdownMenu>
  );
};
