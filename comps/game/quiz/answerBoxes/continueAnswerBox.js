import React, {useState, useEffect,useCallback} from 'react';
import Confetti from 'react-confetti'
import style from '@styles/game_layout.module.css'
import translations from '@translations';

export default function ContinueAnswerBox({lang,handleSubmitAnswer}) {
  return (
    <>
                <div className="header_container">
                    <Confetti
                    confettiSource={{ x: 0, y: -100, w: 650, h: 600 }}
                    friction={0.96} />
                </div>
                <div className="fill_container">
                    <br></br>
                    <br></br>
                    <button
                            onClick={() => handleSubmitAnswer()}
                            className={style.continue_button}>
                        {translations.continue[lang]}
                    </button>
                </div></>
  )
}
