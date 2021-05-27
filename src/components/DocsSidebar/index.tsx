import { TextLink } from "@components/TextLink";
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
    title: "Über dieses Projekt",
    path: "/docs/about",
  },
  {
    title: "Mitmachen",
    path: "/docs/participate",
  },
];

const docsPages: PageType[] = [
  {
    title: "Willkommen",
    path: "/docs",
  },
];

const PagesGroup: FC<PagesGroupPropType> = ({ title, pages }) => (
  <>
    <h4 className='font-bold text-xl mb-2'>{title}</h4>
    <ul className='list-none mb-8'>
      {pages.map(page => (
        <li key={page.path}>
          <TextLink href={page.path}>
            <a>{page.title}</a>
          </TextLink>
        </li>
      ))}
    </ul>
  </>
);

export const DocsSidebar: FC = () => (
  <aside className='hidden sm:block col-span-3 relative'>
    <div className='sticky w-full top-16 overflow-y-auto h-screen'>
      <div className='px-8 py-24 bg-white border-r w-full h-full'>
        <PagesGroup title='Informationen' pages={infoPages} />
        <PagesGroup title='Dokumentation' pages={docsPages} />
      </div>
    </div>
  </aside>
);
