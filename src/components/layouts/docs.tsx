import { useEffect, useState } from "react";
import { MDXLayoutType } from "@common/types/MDXLayout";
import { Button } from "@components/Button";
import { DocsSidebar } from "@components/DocsSidebar";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import Head from "next/head";
import { TableOfContents } from "@components/TableOfContents";
import { DocsBottomNavigation } from "@components/DocsBottomNavigation";

const DocsLayout: MDXLayoutType = ({ children, frontMatter }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [tocTitles, setTocTitles] = useState<HTMLHeadingElement[]>([]);
  const toggleSidebar = (): void => setIsOpened(!isOpened);

  useEffect(() => {
    const classMethod = isOpened ? "add" : "remove";
    document.body.classList[classMethod]("no-scroll");
  }, [isOpened]);

  const scrollUp = (): void => {
    if (typeof window === undefined) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof document === undefined) return;
    setTocTitles(Array.from(document.querySelectorAll("h2")));
  }, []);

  return (
    <>
      <div className='sm:grid sm:grid-cols-12'>
        <DocsSidebar isOpened={isOpened} />
        <article className='col-span-8 lg:col-span-7 xl:col-span-7'>
          <Head>
            <title>
              {frontMatter.metaTitle} | Stadtpuls | Technologiestiftung Berlin
            </title>
            <meta name='description' content={frontMatter.metaDescription} />
          </Head>
          <div className='md:bg-white-dot-pattern'>
            <div
              className={[
                "relative z-0 md:bg-gradient-to-l from-white",
                "px-4 pb-0 py-6 sm:px-8 sm:pt-12 md:p-12 md:pt-18 lg:p-18 lg:pt-24",
              ].join(" ")}
            >
              <div className='container mx-auto' style={{ maxWidth: "89ch" }}>
                <h1
                  id='main-headline'
                  className={[
                    "text-purple text-3xl md:text-4xl",
                    "font-headline font-bold leading-tight",
                  ].join(" ")}
                >
                  {frontMatter.title}
                </h1>
              </div>
            </div>
          </div>
          <div
            className={[
              "relative z-0",
              "container mx-auto prose lg:prose-lg 2xl:prose-2xl prose-purple",
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
            ...tocTitles
              .filter(h2El => !!h2El.textContent && !!h2El.getAttribute("id"))
              .map(h2El => ({
                text: h2El.textContent || "",
                id: h2El.getAttribute("id") || "",
              })),
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
