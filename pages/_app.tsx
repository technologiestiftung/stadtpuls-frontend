import { StrictMode, FC, useEffect } from "react";
import { useRouter } from "next/router";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { useMatomo } from "@lib/hooks/useMatomo";

import { AuthProvider } from "@auth/Auth";

import "../src/style/global.css";
import { Head } from "@components/Head";
import NextNProgress from "nextjs-progressbar";
import colors from "../src/style/colors";
import { BetaBanner } from "@components/BetaBanner";
import { useWindowSize } from "@lib/hooks/useWindowSize";

if (process.env.NODE_ENV !== "production") {
  // require("../src/mocks/index");
}

const Document: FC<{
  Component: FC;
  pageProps: Record<string, unknown>;
}> = ({ Component, pageProps }) => {
  useMatomo();
  const { pathname } = useRouter();
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth && windowWidth < 640;
  const isSensorsPage = pathname?.startsWith("/sensors");
  const isDocsPage = pathname?.startsWith("/docs");
  const isSensorsMap = isSensorsPage && isMobile;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StrictMode>
      <AuthProvider>
        <Head />
        <NextNProgress
          stopDelayMs={50}
          color={colors.green}
          options={{ showSpinner: false }}
        />
        {!isDocsPage && !isSensorsPage && <BetaBanner />}
        <main
          id={pathname?.replace(/\//gi, "") || "home"}
          className='z-0 relative w-full'
          style={{
            paddingTop: 0,
            minHeight: "calc(100vh - 215px)",
          }}
        >
          <Header />
          <Component {...pageProps} />
        </main>
        {!isSensorsMap && <Footer />}
      </AuthProvider>
    </StrictMode>
  );
};

export default Document;
