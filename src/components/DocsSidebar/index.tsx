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
];

const docsPages: PageType[] = [
  {
    title: "Account erstellen",
    path: "/docs/new-account",
  },
  {
    title: "Neues Projekt anlegen",
    path: "/docs/new-project",
  },
  {
    title: "Neues Gerät anlegen",
    path: "/docs/new-device",
  },
  {
    title: "Gerät auf TTN konfigurieren",
    path: "/docs/ttn-configuration",
  },
  {
    title: "Sensordaten anschauen",
    path: "/docs/view-device-data",
  },
  {
    title: "Konto verwalten",
    path: "/docs/manage-account",
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
        <li key={page.path} className='mb-2'>
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
      "md:block md:translate-x-0 md:col-span",
      "fixed md:relative w-full md:w-auto",
    ].join(" ")}
  >
    <div className='sticky w-full top-16 overflow-y-auto h-screen'>
      <div className='px-8 py-8 bg-white border-r w-full h-full'>
        <PagesGroup title='About' pages={infoPages} />
        <PagesGroup title='Dokumentation' pages={docsPages} />
      </div>
    </div>
  </aside>
);
