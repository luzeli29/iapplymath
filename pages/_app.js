import React, { useState } from 'react';
import Head from 'next/head'
import Layout from '../comps/layout'
import '../styles/globals.css'
import AppContext from '../comps/context'
import translationBank from '../public/text/translations'

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState("en");
  return (
    <>
      <Head>
        <title>I AM In My World</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
      <AppContext.Provider
        value={{
          state: {
            translations: translationBank[lang],
            lang: lang,
          },
          setLang: setLang,
        }}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </AppContext.Provider>
    </>
  )
}

export default MyApp
