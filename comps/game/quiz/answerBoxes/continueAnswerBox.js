import React, {useState, useEffect,useCallback} from 'react';
import Confetti from 'react-confetti'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import QuestionFormats from '@utils/game/quiz/questionGeneration/questionFormats'
import DevErr from '@utils/debug/devErr';
import successAudio from '@public/sound/cheering.mp3'
import { useSelector } from 'react-redux';
const ContinueAnswerBox = ({questionFormat, lang,handleSubmitAnswer}) => {

  const musicMuteState = useSelector((state) => state.music.value)


  if(!questionFormat) {
    DevErr('"questionFormat" is required for ContinueAnswerBox.')
    questionFormat = QuestionFormats.continue
  }
  

  
  const renderConfetti = () => {

    if(!musicMuteState){
      let audio = new Audio(successAudio);
      audio.loop = false;
      audio.play();
    }
    
    return (
      <div className="confetti_container">
      <Confetti 
                    confettiSource={{ x: 0, y: -100, w: 6000, h: 4000 }}
                    friction={0.96} />
        </div>
    )
  }
  return (
    <>
                <div className="header_container">
                  {questionFormat.confetti && renderConfetti()}
                </div>
                <div className="fill_container">
            
                    <button
                            onClick={() => handleSubmitAnswer()}
                            className={style.continue_button}>
                        {translations.continue[lang]}
                    </button>
                </div></>
  )
}

export default ContinueAnswerBox