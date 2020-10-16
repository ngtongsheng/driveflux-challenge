import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Navbar } from '@driveflux-code-challenge/ui';
import { PricingContextProvider } from '../state/context';
import 'bulma/css/bulma.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Flux admin</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar></Navbar>
      <section className="section container">
        <header className="flex"></header>
        <main>
          <PricingContextProvider>
            <Component {...pageProps} />
          </PricingContextProvider>
        </main>
      </section>
      <style jsx global>{`
        body,
        html {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          letter-spacing: 1.4px;
        }

        .title,
        .subtitle {
          font-weight: 800;
        }

        header + main {
          margin-top: 1.5em;
        }
      `}</style>
    </>
  );
};

export default CustomApp;
