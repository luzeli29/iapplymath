import React, {useState, useEffect,useCallback} from 'react';
import Image from 'next/image'
import Confetti from 'react-confetti'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import {formatAnswer} from '@utils/imports/commonImports'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import {useRouter} from 'next/router'
import QuizCalculator from './quizCalculator';
import DefaultAnswerBox from './answerBoxes/defaultAnswerBox';
import ContinueAnswerBox from './answerBoxes/continueAnswerBox';

export default function AnswerBox({correctAnswer,questionFormat,handleSubmitAnswer}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()
    const isLoggedIn = user.loggedIn
    if(loading) return <Loading/>
    if(!router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang

    function getAnswerBox() {
        switch(questionFormat) {
            case "continue":
                return <ContinueAnswerBox lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
            default:
                return <DefaultAnswerBox lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
        }
    }

    return (
        getAnswerBox()
    )
}
