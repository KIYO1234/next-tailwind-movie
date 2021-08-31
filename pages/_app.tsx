import { Provider } from "next-auth/client";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { createContext } from "react";
import { context } from "../context/myContext";

export const MyContext = createContext(context);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyContext.Provider value={context}>
      <Provider session={pageProps.session}>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MyContext.Provider>
  );
}

export default MyApp;
