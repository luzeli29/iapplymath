import React, {} from 'react';
import Head from 'next/head'
import Layout from '../comps/layout'
import '../styles/globals.css'
import ContextWrapper from '../context/context'
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>I Apply Math in my World</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
      <ContextWrapper>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </ContextWrapper>        
    </>
  )
}

export default MyApp
