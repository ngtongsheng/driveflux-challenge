import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { PricingContextProvider } from '../state/context';
import 'bulma/css/bulma.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Flux admin</title>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&display=swap" rel="stylesheet"></link>
      </Head>
      <section className="section container">
        <header className="flex">
          <div className="title is-4 is-uppercase">Flux admin</div>
        </header>
        <main>
          <PricingContextProvider>
            <Component {...pageProps} />
          </PricingContextProvider>
        </main>
      </section>
      <style jsx global>{`
        body, html {
          font-family: 'Open Sans', sans-serif;
        }

        .title, .subtitle  {
          font-weight: 700;
        }

        header + main {
          margin-top: 1.5em;
        }
      `}</style>
    </>
  );
};

export default CustomApp;
