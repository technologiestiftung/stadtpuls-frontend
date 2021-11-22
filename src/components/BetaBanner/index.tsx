import { FC, useEffect, useState } from "react";

export const BetaBanner: FC = () => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const hasClosedBetaBanner = sessionStorage.getItem("hasClosedBetaBanner");
    if (hasClosedBetaBanner === "true") {
      setIsClosed(true);
    }
  }, []);

  if (isClosed) return null;
  return (
    <div className='bg-blue text-white relative' role='alert'>
      <div
        className={[
          "container max-w-8xl mx-auto p-4 flex",
          "flex-wrap lg:flex-nowrap gap-x-4 gap-y-2 items-start",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block px-1 text-[11px] mt-1",
            "tracking-wider font-bold bg-green text-blue",
          ].join(" ")}
        >
          BETA
        </span>
        <p className='max-w-none opacity-90 text-sm sm:text-base'>
          Stadtpuls befindet sich noch in der Betaphase und kann Fehler enthalten oder es kann Datenverlust auftreten. Die Benutzung erfolgt auf eigene Gefahr.
        </p>
        <button
          className={[
            "absolute right-2 top-1",
            "text-green hover:text-purple transition",
            "hover:rotate-180 p-2 rounded-full focus-offset",
          ].join(" ")}
          onClick={() => {
            setIsClosed(true);
            sessionStorage.setItem("hasClosedBetaBanner", "true");
          }}
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
