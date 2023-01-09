import { useSessionStorageValue } from "@lib/hooks/useBrowserStorageValue";
import { useRouter } from "next/router";
import { FC } from "react";

const shutdownLevel = parseInt(
  `${process.env.NEXT_PUBLIC_SHUTDOWN_LEVEL || 0}`
);

const gracePeriodText = <>Stadtpuls wird am 31. Januar 2023 Eingestellt</>;
const shutdownAnnouncementText = (
  <>Stadtpuls wird am 31. Januar 2023 Eingestellt</>
);
const shutdownDoneText = <>Stadtpuls wurde am 31. Januar 2023 Eingestellt</>;

export const useHasClosedShutdownBanner = (): [
  isClosed: boolean,
  closeBanner: () => void
] => {
  const [isClosed, setIsClosed] = useSessionStorageValue<boolean>(
    "hasClosedShutdownBanner",
    false
  );

  return [!!isClosed, () => setIsClosed(true)];
};

export const ShutdownBanner: FC = () => {
  const { pathname } = useRouter();
  const [isClosed, closeBanner] = useHasClosedShutdownBanner();

  if (isClosed) return null;
  return (
    <div
      className={[
        pathname === "/" ? "bg-black-dot-pattern" : "bg-white",
        "text-black relative",
      ].join(" ")}
      role='alert'
    >
      <div
        className={[
          "container max-w-8xl mx-auto flex relative",
          "flex-wrap lg:flex-nowrap gap-x-4 gap-y-2 items-start",
          "items-center ring-inset ring-1",
          shutdownLevel < 2
            ? "bg-white ring-error"
            : "bg-black ring-warning text-white",
        ].join(" ")}
      >
        <span
          className={[
            "sm:w-12 sm:h-12 flex place-content-center items-center",
            "tracking-wider font-bold",
            "pl-4 sm:pl-0 pt-4 sm:pt-0 pb-2 sm:pb-0",
            shutdownLevel < 2
              ? "sm:bg-error text-error sm:text-white"
              : "sm:bg-warning text-warning sm:text-white",
          ].join(" ")}
        >
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8.446.057a1 1 0 0 1 .448.45l6.979 14.007a1 1 0 0 1-.895 1.446H1.006a1 1 0 0 1-.894-1.447L7.104.505A1 1 0 0 1 8.446.057ZM8 11.96a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0-7a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1Z'
              fill='currentColor'
              fillRule='evenodd'
            />
          </svg>
        </span>
        <strong className='px-4 sm:px-0'>
          {shutdownLevel === 0 && gracePeriodText}
          {shutdownLevel === 1 && shutdownAnnouncementText}
          {shutdownLevel >= 2 && shutdownDoneText}
        </strong>{" "}
        <a
          href='https://stories.stadtpuls.com/stadtpuls-ende'
          target='_blank'
          rel='noreferrer'
          className='mx-4 mb-4 navigation-link sm:mx-0 sm:mb-0'
        >
          Erfahre mehr im Blogbeitrag
        </a>
        <button
          className={[
            "absolute right-2 top-2",
            "hover:text-purple transition",
            "hover:rotate-180 p-2 rounded-full focus-offset",
            shutdownLevel < 2 ? "text-blue" : "text-green",
          ].join(" ")}
          onClick={closeBanner}
          aria-label='Schließen'
        >
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M.387.21a1 1 0 0 1 1.226 0l.094.083L8 6.585 14.293.293l.094-.083a1 1 0 0 1 1.403 1.403l-.083.094L9.415 8l6.292 6.293a1 1 0 0 1-1.32 1.497l-.094-.083L8 9.415l-6.293 6.292a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094L6.585 8 .293 1.707.21 1.613a1 1 0 0 1 0-1.226L.293.293.387.21Z'
              fill='currentColor'
              fillRule='nonzero'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
