import React from 'react';
import style from '../../../styles/game_layout.module.css'
import translations from '../../../public/text/translations';
import {useRouter} from 'next/router'

//FixMe: is there a way to reduce paramaters?
export default function GameIndexLayout ({lang, game_name,instruction_text, submit_text, handleSubmit, children}) {
   //get router for Next.js
   const router = useRouter()
   return(
      <div className={style.basic_game_container}>  
         <img className="view_background_image_container" src={"/img/" + game_name + "/" + game_name + "_bg.png"}/>
         <button className="basic_button" id={style.back_to_map_button} onClick={() => router.push('/game/map')}>{translations.back_to_map[lang]}</button>
         <div className={style.basic_game_instructions_text_container}>
            <p className={style.basic_game_instructions_text}>{translations[instruction_text][lang]}</p>
         </div>
         <div className={style.basic_game_child_container}>
            {children}
         </div>
         <button className="basic_button" id={style.submit_button} onClick={() => handleSubmit()}>{translations[submit_text][lang]}</button>
      </div>)
}