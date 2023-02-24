import React, {useState, useEffect,useCallback} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'
import Confetti from 'react-confetti'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import {useWrapperContext,Dialog,formatAnswer,simplifyAnswer} from '@common_imports'
import { Calculator } from 'react-mac-calculator'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {motion} from 'framer-motion';
import NumberPad from '@components/game/question_layout/NumberPad'

export default function QuestionBox({questionData, incorrectNum}) {
    //get lang from context
    const context = useWrapperContext()
    const lang = context.state.lang
    const hintText = incorrectNum > 0 ? 
                            (incorrectNum) > questionData.hints.length ? 
                            questionData.hints.at(-1)[lang] 
                            : questionData.hints[incorrectNum-1][lang] 
                            : "";
    return (
        <div className={style.question_text_container}>
            <div className="row">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-10">
                <p>{questionData[lang]}</p>
                </div>
            </div>
            {hintText ? 
            <div className="row">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-10">
                <p>{hintText}</p>
                </div>
            </div> 
            :
            <></>}
        </div>
    );
     
}
