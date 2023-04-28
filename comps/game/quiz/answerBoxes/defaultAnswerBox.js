import React, { useState } from 'react'
import QuizCalculator from '../quizCalculator'
import { getText } from '@commonImports'
import { log } from '@utils/debug/log'

export default function DefaultAnswerBox({lang,handleSubmitAnswer}) {
    const [userAnswer, setUserAnswer] = useState('')

    function handleFormSubmit(event) {
        event.preventDefault()
        log('form submitted with answer: ', userAnswer)
        handleSubmitAnswer(userAnswer)
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
                    </form>
        </div>
    )
}
