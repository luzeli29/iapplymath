import React, { useState } from 'react'
import QuizCalculator from '../quizCalculator/quizCalculator'
import { getText, simplifyAnswer, simplifyFraction } from '@commonImports'
import { err, log } from '@utils/debug/log'
import QuestionFormats from '@utils/game/questionFormats'

const TextInputAnswerBox = ({questionFormat,lang,handleSubmitAnswer}) => {
    if(!questionFormat) {
        err('"questionFormat" is required for TextInputAnswerBox.')
        questionFormat = QuestionFormats.wholeNumber
    }

    console.log(questionFormat.answerBoxMessage);

    const [userAnswer, setUserAnswer] = useState('')
    const [answerFeedback, setAnswerFeedback] = useState('')

    //return true if valid answer
    const validateAnswerRegex = (answer) => {
        const regex = questionFormat.validationRegex
        const isValidAnswer = regex.test(answer)
        return isValidAnswer
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        log('form submitted with answer: ' + userAnswer)

        if(userAnswer === '') {
            setAnswerFeedback(getText(empty_answer,lang))
        } 
        
        let isValidAnswer

        if(questionFormat.validationRegex) {
            isValidAnswer = validateAnswerRegex(userAnswer)
            console.log('isValidAnswer: ' + isValidAnswer)
        }

        if(!isValidAnswer) {
            const validationFailMessage = questionFormat.validationFailMessage
            setAnswerFeedback(getText(validationFailMessage,lang))
            return
        }

        let simplifiedAnswer = userAnswer

        if(questionFormat.simplifyAnswer) {
            try{
            simplifiedAnswer = questionFormat.simplifyAnswer(simplifiedAnswer)
            }   catch(e) {
                err('Error simplifying answer: ' + userAnswer + ' with simplifyAnswer()')
            }
        }
        handleSubmitAnswer(simplifiedAnswer)
        setAnswerFeedback('')
        setUserAnswer('')
    }

    const renderTextInput = () => {
        return (
        <div className="input-group mb-3">
            <input maxLength='15' onChange={e => setUserAnswer(e.target.value)} className="form-control text-center" value={userAnswer} id="userAnswer" type="text" name="userAnswer"/>
            <button disabled={userAnswer == ''} className='btn btn-outline-primary' type="submit" name="action" value="submit_answer">{getText('submit',lang)}</button>
        </div>
        )
    }
    
    return (
        <div className='row mx-auto'>
            <form autoComplete='off' onSubmit={handleFormSubmit}>
                <div className='row'>
                    <label className="col text-center" htmlFor="userAnswer">{getText('type_answer',lang)}</label>
                </div>
                <div className='row'>
                    {questionFormat.answerBoxMessage &&
                    <label className="col-12 text-center" htmlFor="userAnswer">{getText(questionFormat.answerBoxMessage,lang)}</label>
                    }
                </div>
                <div className='row mx-auto w-75'>
                    {renderTextInput()}
                </div>
                <div className='row'>
                    {answerFeedback && 
                    <label className="col text-center red" htmlFor="userAnswer">{answerFeedback}</label>
                    }
                </div>
            </form>
        </div>
    )
}

export default TextInputAnswerBox
