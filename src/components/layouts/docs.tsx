import { Children, useState } from "react";
import { MDXLayoutType } from "@common/types/MDXLayout";
import { Button } from "@components/Button";
import { docsPages, DocsSidebar } from "@components/DocsSidebar";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import Head from "next/head";
import { TableOfContents } from "@components/TableOfContents";
import { useRouter } from "next/router";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

interface MDXReactChild {
  props: {
    originalType: string;
    children: string;
    id: string;
  };
}

const DocsLayout: MDXLayoutType = ({ children, frontMatter }) => {
  const { pathname } = useRouter();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggleSidebar = (): void => setIsOpened(!isOpened);

  const scrollUp = (): void => {
    if (typeof window === undefined) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const childrenArr = (Children.toArray(children) as MDXReactChild[])
    .filter(({ props }) => !props || props.originalType === "h2")
    .map(({ props }, idx) => ({
      text: props?.children || `${idx}`,
      id: props?.id || `${idx}`,
    }));

  const currentPageIndex = docsPages.findIndex(({ path }) => pathname === path);
  const nextPage =
    docsPages[
      (currentPageIndex || 0) + 1 > docsPages.length - 1
        ? 0
        : (currentPageIndex || 0) + 1
    ];
  const prevPage =
    docsPages[
      (currentPageIndex || 0) - 1 < 0
        ? docsPages.length - 1
        : (currentPageIndex || 0) - 1
    ];

  return (
    <>
      <TableOfContents
        links={[
          {
            text: frontMatter.title,
            id: "main-headline",
          },
          ...childrenArr,
        ]}
      />
      <div className='md:grid md:grid-cols-12'>
        <DocsSidebar isOpened={isOpened} />
        <article className='col-span-8 lg:col-span-7 xl:col-span-8'>
          <Head>
            <title>
              {frontMatter.metaTitle} | Berlin IoT Hub | Technologiestiftung
              Berlin
            </title>
            <meta name='description' content={frontMatter.metaDescription} />
          </Head>
          <div
            className={[
              "relative z-0",
              "container mx-auto prose lg:prose-lg 2xl:prose-2xl prose-blue",
              "px-4 py-6 sm:px-8 sm:py-12 md:px-12 md:py-18 lg:px-18 lg:py-24",
            ].join(" ")}
          >
            <h1 id='main-headline'>{frontMatter.title}</h1>
            {children}
          </div>
          {!!currentPageIndex && (
            <nav className='px-4 py-6 sm:p-8 md:p-12 lg:p-18'>
              <ul className='grid sm:grid-cols-2 gap-4 sm:gap-8 md:gap-12 lg:gap-18'>
                <li>
                  <a
                    href={prevPage.path}
                    className='block p-4 sm:p-8 border rounded bg-gray-50 text-blue-500 flex justify-between'
                  >
                    <ArrowBack />
                    <span>{prevPage.title}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={nextPage.path}
                    className='block p-4 sm:p-8 border rounded bg-gray-50 text-blue-500 flex justify-between'
                  >
                    <span>{nextPage.title}</span>
                    <ArrowForward />
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </article>
      </div>
      <div className='fixed bottom-4 right-4 z-20'>
        <Button
          variant='primary'
          className='mr-2 md:hidden'
          onClick={toggleSidebar}
        >
          {isOpened ? (
            <>
              <CloseIcon /> Schließen
            </>
          ) : (
            <>
              <MenuIcon /> Seiten
            </>
          )}
        </Button>
        {!isOpened && (
          <Button variant='secondary' onClick={scrollUp}>
            <ArrowUpwardIcon />
          </Button>
        )}
      </div>
    </>
  );
};

export default DocsLayout;
