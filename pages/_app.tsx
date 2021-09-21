import { StrictMode, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "theme-ui";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { useMatomo } from "@lib/hooks/useMatomo";

import { AuthProvider } from "@auth/Auth";

import theme from "../src/style/theme";
import "../src/style/global.css";
import { Head } from "@components/Head";

if (process.env.NODE_ENV !== "production") {
  //require("../src/mocks/index");
}

const App: FC<{
  Component: FC;
  pageProps: Record<string, unknown>;
}> = ({ Component, pageProps }) => {
  useMatomo();
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Head />
          <Header />
          <main
            id={pathname?.replace(/\//gi, "") || "home"}
            className='z-0 relative'
            style={{
              paddingTop: pathname === "/" ? 0 : 62,
              minHeight: "calc(100vh - 215px)",
            }}
          >
            <Component {...pageProps} />
          </main>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
