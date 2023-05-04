import React, {useState, useEffect,useCallback} from 'react';
import 'reactjs-popup/dist/index.css';
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import {useRouter} from 'next/router'
import ContinueAnswerBox from './answerBoxes/continueAnswerBox';
import QuestionFormats from '@utils/game/questionFormats'
import TextInputAnswerBox from './answerBoxes/textInputAnswerBox';
import { err, log } from '@utils/debug/log';
import QuizCalculator from './quizCalculator/quizCalculator';
import ButtonAnswerBox from './answerBoxes/buttonAnswerBox';

export default function AnswerBox({correctAnswer,questionFormatKey,handleSubmitAnswer}) {
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
            err('"questionFormat" is not defined')
            return <ContinueAnswerBox lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
        }
        
        switch(questionFormat.answerBoxType) {
            case 'textInput':
                return <TextInputAnswerBox questionFormat={questionFormat} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
            case 'buttons':
                return <ButtonAnswerBox questionFormat={questionFormat} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
            case 'continue':
                return <ContinueAnswerBox questionFormat={questionFormat} lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
            default:
                err('Invalid answerBoxType')
                return <ContinueAnswerBox lang={lang} handleSubmitAnswer={handleSubmitAnswer}/>
        }
    }

    return (
        <div className=''> 
            <div className='row px-2'>
                <div className='col-4'>
                    {questionFormat.calculatorType && <QuizCalculator calculatorType={questionFormat.calculatorType}/>}
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
