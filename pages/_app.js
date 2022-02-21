import Head from 'next/head'
import Layout from '../comps/layout'
import '../styles/globals.css'
import LangSelect from "../comps/lang-select";
import React, { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState(0);
  const changeLang = (newLang) => {
    setLang(newLang)
  }

  return (
    <>
      <Head>
        <title>I AM In My World</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
      <Layout>
        <LangSelect onClick={changeLang}/>
        <Component {...pageProps} lang={lang}/>
      </Layout>
    </>
  )
}

export default MyApp
