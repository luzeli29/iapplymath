import '@utils/debug/wdyr'; // <--- first import

import React, {} from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';
import '@styles/globals.css'
import Layout from '@layouts/core/core_layout'
import ContextWrapper from '@components/context/context'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, session, ...pageProps }) {
  return (
    <>
      <Head>
        <title>I Apply Math in my World</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
      <SessionProvider session={session}>
        <ContextWrapper>
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </ContextWrapper> 
      </SessionProvider>       
    </>
  )
}


export default MyApp
