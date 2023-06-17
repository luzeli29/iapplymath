import '@utils/debug/wdyr'; // <--- first import

import React, {} from 'react';
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css';
import '@styles/globals.css'
import Layout from '@layouts/core/coreLayout'
import SiteWrapper from '@hooks/siteContext/useUserContext'
import ReactHowler from 'react-howler';
import song from '../public/sound/salsa_bg.mp3'
import store from 'store/store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux'


function MyApp ({ Component, pageProps}){
  return (
    <Provider store={store}>
      <App 
        Component={Component}
        pageProps={pageProps}
      />
    </Provider>
  )
}

function App({ Component, pageProps }) {

  const musicMuteState = useSelector((state) => state.music.value)

  return (
    <>
      <ReactHowler src={song} playing={true} loop={true} volume={0.5} mute={musicMuteState}/>
      <Head>
        <title>I Apply Math in my World</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
      <SiteWrapper>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </SiteWrapper>
    </>
  )
}


export default MyApp
