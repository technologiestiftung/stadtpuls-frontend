import { allPages } from "@components/DocsSidebar";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import Link from "next/link";
import { FC } from "react";

interface DocsBottomNavigationLiPropType {
  className?: string;
  href: string;
}

const DocsBottomNavigationLi: FC<DocsBottomNavigationLiPropType> = ({
  className = "",
  href,
  children,
}) => (
  <li>
    <Link href={href}>
      <a
        href={href}
        className={[
          className,
          "block p-4 sm:p-8 border rounded bg-white-dot-pattern",
          "text-purple flex justify-between",
          "transition hover:border-purple hover:bg-gray-50",
        ].join(" ")}
      >
        {children}
      </a>
    </Link>
  </li>
);

export const DocsBottomNavigation: FC<{ page: string }> = ({ page }) => {
  const pages = allPages.map(({ path }) => {
    const cleanPath = path.replace("/docs/", "");
    return cleanPath === "" ? "index" : cleanPath;
  });
  const currentPageIndex = pages.findIndex(path => path === page);

  if (currentPageIndex < 0) return null;

  const nextPage = nextInArray(allPages, currentPageIndex);
  const prevPage = prevInArray(allPages, currentPageIndex);

  return (
    <nav className='px-4 py-6 sm:p-8 md:p-12 lg:p-18'>
      <ul className='grid sm:grid-cols-2 gap-4 sm:gap-8 md:gap-12 lg:gap-18'>
        <DocsBottomNavigationLi href={prevPage.path}>
          <ArrowBack />
          <span>{prevPage.title}</span>
        </DocsBottomNavigationLi>
        <DocsBottomNavigationLi href={nextPage.path}>
          <span>{nextPage.title}</span>
          <ArrowForward />
        </DocsBottomNavigationLi>
      </ul>
    </nav>
  );
};

function prevInArray<ItemType>(
  arr: ItemType[],
  currentIndex: number
): ItemType {
  const prevIndex = currentIndex - 1;
  const lastIndexInArray = arr.length - 1;
  return arr[prevIndex < 0 ? lastIndexInArray : prevIndex];
}

function nextInArray<ItemType>(
  arr: ItemType[],
  currentIndex: number
): ItemType {
  const nextIndex = currentIndex + 1;
  const lastIndexInArray = arr.length - 1;
  return arr[nextIndex > lastIndexInArray ? 0 : nextIndex];
}
