import { TextLink } from "@components/TextLink";
import { FC } from "react";

interface PageType {
  title: string;
  path: string;
}

const pages: PageType[] = [
  {
    title: "Willkommen",
    path: "/docs",
  },
];

export const DocsSidebar: FC = () => (
  <aside className='col-span-3 relative'>
    <div className='sticky w-full top-16 overflow-y-auto h-screen'>
      <div className='px-8 py-24 bg-white border-r w-full h-full'>
        <h4 className='font-bold text-xl mb-2'>Documentation</h4>
        <ul className='list-none'>
          {pages.map(page => (
            <li key={page.path}>
              <TextLink href={page.path}>
                <a>{page.title}</a>
              </TextLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </aside>
);
