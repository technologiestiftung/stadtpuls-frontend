import Link from "next/link";
import { StadtpulsLogo } from "@components/StadtpulsLogo";
import { HeaderMenu } from "@components/HeaderMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 100;

export const Header: React.FC = () => {
  const router = useRouter();
  const { pathname } = router || {};
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const hasDarkMode = pathname === "/" && !hasScrolled;

  useEffect(() => {
    const scrollContainer = document.querySelector("html");
    if (!scrollContainer) return;
    const onScroll: EventListener = () => {
      if (scrollContainer.scrollTop > SCROLL_THRESHOLD) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [setHasScrolled]);
  const isDocs = pathname?.startsWith("/docs");
  const isSensors = pathname === "/sensors";

  return (
    <header
      id='main-header'
      className={[
        "w-full z-50 top-0 border-t-0",
        isDocs || isSensors ? "fixed" : "sticky",
      ].join(" ")}
    >
      <nav
        className={[
          "w-full border transition border-t-0",
          "flex place-content-between",
          !isDocs && !isSensors && "container mx-auto max-w-8xl",
          hasDarkMode
            ? ["bg-black-dot-pattern border-purple text-white"]
            : ["bg-white border-gray-100 shadow text-blue"],
        ]
          .flat()
          .filter(Boolean)
          .join(" ")}
      >
        <Link href='/'>
          <StadtpulsLogo
            className={[
              "p-4 sm:border-r transition focus-offset",
              hasDarkMode ? "border-purple" : "border-gray-100",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </Link>
        <section className='flex flex-row-reverse lg:flex-row gap-2 sm:gap-4 items-center pr-4'>
          <HeaderMenu hasDarkMode={hasDarkMode} />
        </section>
      </nav>
    </header>
  );
};
