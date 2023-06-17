import React, {useState, useEffect,useCallback} from 'react';
import 'reactjs-popup/dist/index.css';
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import {useRouter} from 'next/router'
import ContinueAnswerBox from './answerBoxes/continueAnswerBox';
import QuestionFormats from '@utils/game/quiz/questionGeneration/questionFormats'
import TextInputAnswerBox from './answerBoxes/textInputAnswerBox';
import QuizCalculator from './quizCalculator/quizCalculator';
import ButtonAnswerBox from './answerBoxes/buttonAnswerBox';
import DevErr from '@utils/debug/devErr';

export default function AnswerBox({correctAnswer,questionFormatKey,handleSubmitAnswer, handleInitTime, handleEndTime}) {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()
    const isLoggedIn = user.loggedIn
    if(loading) return <Loading/>
    if(!router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang
    const questionFormat = QuestionFormats[questionFormatKey];
    const getAnswerBox = () => {
        if(!questionFormat) {
            DevErr('"questionFormat" is not defined')
            return <ContinueAnswerBox handleEndTime={handleEndTime} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
        }
        
        switch(questionFormat.answerBoxType) {
            case 'textInput':
                return <TextInputAnswerBox handleInitTime={handleInitTime} questionFormat={questionFormat} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
            case 'buttons':
                return <ButtonAnswerBox handleInitTime={handleInitTime} questionFormat={questionFormat} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
            case 'continue':
                return <ContinueAnswerBox handleEndTime={handleEndTime} questionFormat={questionFormat} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
            default:
                DevErr('Invalid answerBoxType')
                return <ContinueAnswerBox handleEndTime={handleEndTime} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
        }
    }

    return (
        <div className=''> 
            <div className='row px-2'>
                <div className='col-4'>
                    {questionFormat.calculatorType && <QuizCalculator calculatorType={questionFormat.calculatorType} lang={lang}/>}
                </div>
                <div className='col-8'>
                </div>
            </div>
            <div className='row px-2'>
                {getAnswerBox()}
            </div>
        </div>
    )
}
