import React, { useState } from "react";
// Modules
import { AppProps } from "next/app";
import "react-notifications-component/dist/theme.css";
import Head from "next/head";
// MUI Core
// Utils
import { theme } from "../utils/theme";
import Layout from "../components/common/Layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { wrapper } from "../store/store";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import FlowerLoading from "../components/FlowerLoading";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const handleStart = (url: any) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Best Bride</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-draft-wysiwyg@1.12.3/dist/react-draft-wysiwyg.css"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          {loading && <FlowerLoading />}
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
