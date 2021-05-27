import { Children, useState } from "react";
import { MDXLayoutType } from "@common/types/MDXLayout";
import { Button } from "@components/Button";
import { DocsSidebar } from "@components/DocsSidebar";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import Head from "next/head";
import { TableOfContents } from "@components/TableOfContents";

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
        <article className='col-span-9 lg:col-span-7'>
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
