import { CircularProgressBar } from "@components/CircularProgressBar";
import { DropdownMenu } from "@components/DropdownMenu";
import { DownloadQueueType } from "@lib/hooks/useDownloadQueue";
import ArrowDownWithHalfSquare from "../../../public/images/icons/16px/arrowDownWithHalfSquare.svg";
import CrossShort from "../../../public/images/icons/16px/crossShort.svg";
import { useEffect, FC } from "react";

interface DownloadQueueButtonPropType {
  queue?: DownloadQueueType;
  onDownloadCancel?: (id: string) => void;
}

export const DownloadQueueButton: FC<DownloadQueueButtonPropType> = ({
  queue = {},
  onDownloadCancel = () => undefined,
}) => {
  const queueArray = Object.values(queue).filter(Boolean);
  const progressTotal = queueArray.reduce(
    (acc, curr) => acc + curr.progress,
    0
  );
  const progress = Math.round(progressTotal / queueArray.length) || 0;
  const isVisible = progress > 0 && progress < 100;

  useEffect(() => {
    if (progress === 0 && "activeElement" in document) {
      (document.activeElement as HTMLElement).blur();
    }
  }, [progress]);

  return (
    <DropdownMenu
      position='right'
      items={queueArray.map(({ id, username, title, progress }) => ({
        id,
        title: (
          <span className='grid grid-cols-[1fr,auto,auto] w-80 gap-4 items-center content-center'>
            <span className='overflow-ellipsis truncate'>{title}</span>
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
              <span className='ml-1 text-xs leading-[10px] w-6 font-mono text-gray-400'>
                {progress}%
              </span>
            </span>
            <button
              className={[
                "rounded-full focus-ring text-gray-500 hover:text-purple transition-colors",
                "relative z-10",
              ].join(" ")}
              onClick={evt => {
                evt.preventDefault();
                evt.stopPropagation();
                onDownloadCancel(id);
              }}
            >
              <CrossShort />
            </button>
          </span>
        ),
        href: `/${username}/${id}`,
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
