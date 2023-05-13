import React from 'react';
import {useRouter} from 'next/router'
import translations from '@translations';
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
export default function FinishLayout ({gameName,restart_text,handleRestart}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang
   //get router for Next.js
   return (
      <>
          <img className="view_background_image_container" src={"/img/" + gameName + "/" + gameName + "_bg.png"}/>
          <div className="end_container">
              <button className="end_button" onClick={() => router.push('/game/map')}>{translations.back_to_map[lang]}</button>
              <button className="end_button" onClick={() => handleRestart()}>{translations[restart_text][lang]}</button>
          </div>
      </>
  )
}
