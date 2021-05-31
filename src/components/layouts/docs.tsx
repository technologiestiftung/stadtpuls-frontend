import { Children, useState } from "react";
import { MDXLayoutType } from "@common/types/MDXLayout";
import { Button } from "@components/Button";
import { DocsSidebar } from "@components/DocsSidebar";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import Head from "next/head";
import { TableOfContents } from "@components/TableOfContents";
import { DocsBottomNavigation } from "@components/DocsBottomNavigation";

interface MDXReactChild {
  props: {
    originalType: string;
    children: string;
    id: string;
  };
}

const DocsLayout: MDXLayoutType = ({ children, frontMatter }) => {
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

  return (
    <>
      <div className='md:grid md:grid-cols-12'>
        <DocsSidebar isOpened={isOpened} />
        <article className='col-span-8 lg:col-span-7 xl:col-span-7'>
          <Head>
            <title>
              {frontMatter.metaTitle} | Berlin IoT Hub | Technologiestiftung
              Berlin
            </title>
            <meta name='description' content={frontMatter.metaDescription} />
          </Head>
          <div
            className={[
              "relative z-0 md:bg-gradient-to-r from-gray-100",
              "px-4 pb-0 py-6 sm:px-8 sm:pt-12 md:p-12 md:pt-18 lg:p-18 lg:pt-24",
            ].join(" ")}
          >
            <div className='container mx-auto prose'>
              <h1 id='main-headline'>{frontMatter.title}</h1>
            </div>
          </div>
          <div
            className={[
              "relative z-0",
              "container mx-auto prose lg:prose-lg 2xl:prose-2xl prose-blue",
              "px-4 py-6 sm:p-8 sm:pb-12 md:p-12 md:pb-18 lg:p-18 lg:pb-24",
            ].join(" ")}
          >
            {children}
          </div>
          <DocsBottomNavigation />
        </article>
        <TableOfContents
          links={[
            {
              text: frontMatter.title,
              id: "main-headline",
            },
            ...childrenArr,
          ]}
        />
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
