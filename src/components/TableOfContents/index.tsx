import { useReducedMotion } from "@lib/hooks/useReducedMotion";
import { FC, useEffect, useRef, useState } from "react";

interface TableOfContentsLinkType {
  id: string;
  text: string;
}

interface TableOfContentsPropType {
  links: TableOfContentsLinkType[];
}

const scrollToId = (id: string, reducedMotion = false): void => {
  const elementToScrollTo = document.getElementById(id);
  if (!elementToScrollTo) return;

  const headerOffset = 40;
  const elementPosition = elementToScrollTo.offsetTop;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: reducedMotion ? "auto" : "smooth",
  });
};

const getActiveLinkId = (): string => {
  const h2Els = Array.from(document.querySelectorAll("h2"));
  const mappedH2s = h2Els.map(h2El => ({
    top: h2El.offsetTop,
    id: h2El.getAttribute("id") || "main-headline",
  }));

  const windowEl = {
    id: "window",
    top: window.scrollY,
  };
  const allElements = [
    {
      id: "main-headline",
      top: document.getElementById("main-headline")?.offsetTop || 0,
    },
    ...mappedH2s,
    windowEl,
  ].sort((a, b) => a.top - b.top);
  const indexOfWindowScroll = allElements.findIndex(
    ({ id }) => id === "window"
  );
  const indexOfPrevEl = Math.max(0, indexOfWindowScroll - 1);
  const indexOfNextEl = Math.min(
    allElements.length - 1,
    indexOfWindowScroll + 1
  );
  const prevEl = allElements[indexOfPrevEl];
  const nextEl = allElements[indexOfNextEl];
  const activeEl = windowEl.top > nextEl.top - 200 ? nextEl : prevEl;
  return activeEl.id === "window" ? prevEl.id : activeEl.id;
};

export const TableOfContents: FC<TableOfContentsPropType> = ({ links }) => {
  const requestRef = useRef(0);
  const reducedMotionWished = useReducedMotion(false);
  const [activeLinkId, setActiveLinkId] = useState<string>("main-headline");

  const checkForActiveLinks = (): void => {
    setActiveLinkId(getActiveLinkId());

    requestRef.current = requestAnimationFrame(checkForActiveLinks);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(checkForActiveLinks);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='hidden relative lg:col-span-2 xl:col-span-3 lg:block h-full'>
      <div className='h-60' />
      <nav className='sticky top-24 right-4'>
        <h4 className='font-bold mb-2 text-gray-500'>Auf dieser Seite</h4>
        <ul>
          {links.map(({ id, text }) => (
            <li key={id} className='mb-2'>
              <button
                onClick={() => scrollToId(id, reducedMotionWished)}
                className={[
                  "text-left cursor-pointer",
                  "hover:text-blue transition",
                  "focus:ring-2 focus:ring-offset-white focus:ring-offset-2",
                  "focus:ring-green focus:outline-none",
                  "leading-tight pr-1 pl-3 py-0.5 -ml-3",
                  activeLinkId === id
                    ? "border-l-2 border-purple text-purple"
                    : "text-gray-400",
                ].join(" ")}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
