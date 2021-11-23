import { ActiveLink } from "@components/ActiveLink";
import { FC } from "react";

interface PageType {
  title: string;
  path: string;
}

interface PagesGroupPropType {
  title: string;
  pages: PageType[];
}

const infoPages: PageType[] = [
  {
    title: "Willkommen",
    path: "/docs",
  },
  {
    title: "Über dieses Projekt",
    path: "/docs/about",
  },
  {
    title: "FAQ",
    path: "/docs/faq",
  },
  {
    title: "Nutzungsbedingungen",
    path: "/docs/terms",
  },
];

const docsPages: PageType[] = [
  {
    title: "Stadtpuls-Account",
    path: "/docs/stadtpuls-account",
  },
  {
    title: "Neuen TTN-Sensor anlegen",
    path: "/docs/ttn-sensor",
  },
  {
    title: "Neuen HTTP-Sensor anlegen",
    path: "/docs/http-sensor",
  },
  {
    title: "Sensordaten nutzen",
    path: "/docs/view-device-data",
  },
  {
    title: "Troubleshooting",
    path: "/docs/troubleshooting",
  },
];

export const allPages = [...infoPages, ...docsPages];

const PagesGroup: FC<PagesGroupPropType> = ({ title, pages }) => (
  <>
    <h4 className='font-bold text-xl 2xl:text-2xl mb-2'>{title}</h4>
    <ul className='list-none mb-8 2xl:text-lg leading-tight'>
      {pages.map(page => (
        <li key={page.path} className='mb-3'>
          <ActiveLink activeClassName='navigation-link-active' href={page.path}>
            <a href={page.path} className='navigation-link p-4 block sm:inline'>
              {page.title}
            </a>
          </ActiveLink>
        </li>
      ))}
    </ul>
  </>
);

interface DocsSidebarPropType {
  isOpened?: boolean;
}

export const DocsSidebar: FC<DocsSidebarPropType> = ({ isOpened = true }) => (
  <aside
    className={[
      isOpened ? "" : "-translate-x-full",
      "transform transition col-span-4 lg:col-span-3 xl:col-span-2 z-10",
      "sm:block sm:translate-x-0 sm:col-span",
      "fixed sm:relative w-full sm:w-auto bg-white",
    ].join(" ")}
  >
    <div className='fixed sm:sticky w-full top-0 sm:top-16 overflow-y-auto h-screen'>
      <div className='px-8 pt-8 pb-24 sm:pb-8 bg-white border-r w-full min-h-full'>
        <PagesGroup title='About' pages={infoPages} />
        <PagesGroup title='Dokumentation' pages={docsPages} />
      </div>
    </div>
  </aside>
);
