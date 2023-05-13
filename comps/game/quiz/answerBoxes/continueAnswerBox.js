import React, {useState, useEffect,useCallback} from 'react';
import Confetti from 'react-confetti'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import QuestionFormats from '@utils/game/questionFormats'
import DevErr from '@utils/debug/devErr';

const ContinueAnswerBox = ({questionFormat, lang,handleSubmitAnswer}) => {
  if(!questionFormat) {
    DevErr('"questionFormat" is required for ContinueAnswerBox.')
    questionFormat = QuestionFormats.continue
  }
  
  const renderConfetti = () => {
    return (
      <Confetti
                    confettiSource={{ x: 0, y: -100, w: 650, h: 600 }}
                    friction={0.96} />
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