import React from 'react';
import {useRouter} from 'next/router'
import translations from '@translations';

export default function FinishLayout ({lang,game_name,restart_text,handleRestart}) {
   //get router for Next.js
   const router = useRouter()
   return (
      <>
          <img className="view_background_image_container" src={"/img/" + game_name + "/" + game_name + "_bg.png"}/>
          <div className="end_container">
              <button className="end_button" onClick={() => router.push('/game/map')}>{translations.back_to_map[lang]}</button>
              <button className="end_button" onClick={() => handleRestart()}>{translations[restart_text][lang]}</button>
          </div>
      </>
  )
}
