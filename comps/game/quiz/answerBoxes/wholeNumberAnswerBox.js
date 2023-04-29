import React, { useState } from 'react'
import QuizCalculator from '../quizCalculator'
import { getText, simplifyAnswer, simplifyFraction } from '@commonImports'
import { log } from '@utils/debug/log'

const properWholeNumberRegex = /^[0-9]+$/;

const WholeNumberAnswerBox = ({lang,handleSubmitAnswer}) => {
    const [userAnswer, setUserAnswer] = useState('')
    const [answerFeedback, setAnswerFeedback] = useState('')

    const validateWholeNumber = (answer) => {
        const isWholeNumber = properWholeNumberRegex.test(answer)
        return isWholeNumber
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        log('form submitted with answer: ', userAnswer)
        if(userAnswer === '') {
            setAnswerFeedback('empty_answer')
        } else if(validateWholeNumber(userAnswer)){
                handleSubmitAnswer(userAnswer)
                setAnswerFeedback('')
        } else {
            setAnswerFeedback('invalid_whole_number')
        }
        setUserAnswer('')
    }
    
    return (
        <div className='row'>
                    <div className='col-3'>
                        <QuizCalculator/>
                    </div>
                    <form autoComplete='off' onSubmit={handleFormSubmit}>
                        <div className='row'>
                            <label className="col text-center" htmlFor="userAnswer">{getText('type_answer',lang)}</label>
                        </div>
                        <div className='row mx-auto w-75'>
                            <div className='col-8'>
                                <input maxlength='15' onChange={e => setUserAnswer(e.target.value)} className="" value={userAnswer} id="userAnswer" type="text" name="userAnswer"/>
                            </div>
                            <div className='col-4'>
                                <button type="submit" name="action" value="submit_answer">{getText('submit',lang)}</button>
                            </div>
                        </div>
                        <div className='row'>
                            <label className="col text-center red" htmlFor="userAnswer">{getText(answerFeedback,lang)}</label>
                        </div>
                    </form>
        </div>
    )
}

export default WholeNumberAnswerBox