import '@utils/debug/wdyr'; // <--- first import

import React, {} from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';
import '@styles/globals.css'
import Layout from '@layouts/core/core_layout'
import ContextWrapper from '@components/context/context'

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
