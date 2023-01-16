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
import { useReducedMotion } from "@lib/hooks/useReducedMotion";
import slugify from "slugify";
import { Alert } from "@components/Alert";

interface TocTitleType {
  el: HTMLHeadingElement;
  text: string;
  id: string;
}

const DocsLayout: MDXLayoutType = ({ slug, children, frontMatter }) => {
  const reducedMotionWished = useReducedMotion(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [tocTitles, setTocTitles] = useState<TocTitleType[]>([]);
  const toggleSidebar = (): void => setIsOpened(!isOpened);

  useEffect(() => {
    const classMethod = isOpened ? "add" : "remove";
    document.body.classList[classMethod]("no-scroll");
  }, [isOpened]);

  const scrollUp = (): void => {
    if (typeof window === undefined) return;
    window.scrollTo({
      top: 0,
      behavior: reducedMotionWished ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    if (typeof document === undefined) return;
    const h2Els = Array.from(document.querySelectorAll("h2"))
      .filter(h2El => h2El.textContent)
      .map(h2El => ({
        el: h2El,
        text: h2El.textContent || "",
        id: slugify(h2El.textContent || ""),
      }));
    h2Els.forEach(({ el, id }) => {
      el.setAttribute("id", id);
    });
    setTocTitles(h2Els);
  }, [frontMatter.title]);

  return (
    <>
      <div className='sm:grid sm:grid-cols-12 pt-[62px]'>
        <DocsSidebar isOpened={isOpened} />
        <article className='col-span-8 lg:col-span-7 xl:col-span-7'>
          <Head>
            <title>
              {frontMatter.metaTitle} | Stadtpuls | Technologiestiftung Berlin
            </title>
            <meta name='description' content={frontMatter.metaDescription} />
          </Head>
          <div className='md:bg-white-dot-pattern'>
            <div className='relative z-0 md:bg-gradient-to-l from-white'>
              <div
                className={[
                  "text-base",
                  "container max-w-none",
                  "px-4 pb-0 py-6 sm:p-8 sm:pt-12 md:pt-18 md:px-12 lg:px-18 lg:pt-24",
                ].join(" ")}
              >
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
              "container max-w-prose prose-purple",
              "px-4 py-6 sm:p-8 md:p-12 lg:p-18",
            ].join(" ")}
          >
            <Alert
              title='Stadtpuls wurde Beendet'
              type='warning'
              isRemovable={false}
              message={
                <p>
                  Stadtpuls wurde am 31. Januar 2023 beendet. Diese
                  Dokumentation ist archiviert und dient nur zu
                  Demonstrationszwecken.
                  <br />
                  <a
                    href='https://stories.stadtpuls.com/stadtpuls-ende'
                    target='_blank'
                    rel='noreferrer'
                    className='mx-4 navigation-link mb-4 sm:mx-0 sm:mb-0'
                  >
                    Erfahre mehr dazu in der Stadtpuls Story
                  </a>
                </p>
              }
            />
          </div>
          <div
            className={[
              "relative z-0",
              "container prose prose-purple",
              "px-4 py-6 sm:p-8 sm:pb-12 md:p-12 md:pb-18 lg:p-18 lg:pb-24",
            ].join(" ")}
          >
            {children}
          </div>
          <DocsBottomNavigation page={slug} />
        </article>
        <TableOfContents
          links={[
            {
              text: frontMatter.title,
              id: "main-headline",
            },
            ...tocTitles,
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
          <Button variant='secondary' onClick={scrollUp} className='bg-white'>
            <ArrowUpwardIcon />
          </Button>
        )}
      </div>
    </>
  );
};

export default DocsLayout;
