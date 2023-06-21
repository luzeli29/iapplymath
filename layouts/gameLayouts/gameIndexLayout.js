import React from 'react';
import {useRouter} from 'next/router'
import style from '@styles/game_layout.module.css'
import getText from '@utils/text/getText'
import TextReader from '@comps/accessibility/textReader';

//FixMe: is there a way to reduce paramaters?
export default function GameIndexLayout ({lang, gameName,instruction_text, submit_text, handleSubmit, children}) {
   //get router for Next.js
   const router = useRouter()
   return(
      <>
          <img className="view_background_image_container" src={"/img/" + gameName + "/" + gameName + "_bg.png"}/> 
         <button className="basic_button mt-0 mb-0" id={style.back_to_map_button} onClick={() => router.push('/game/map')}>{getText('back_to_map',lang)}</button>
         <div className={style.basic_game_instructions_text_container}>
            <p className={style.basic_game_instructions_text}>{getText(instruction_text,lang)}</p>
            <TextReader text={getText(instruction_text,lang)} reader={gameName}/>
         </div>
         
         <div style={{ maxHeight: '85%' }} className={style.basic_game_child_container}>
            {children}
         </div>
         <button className="basic_button" id={style.submit_button} onClick={() => handleSubmit()}>{getText(submit_text,lang)}</button>
      </>
    )

}