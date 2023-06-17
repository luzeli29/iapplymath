import React, { useState } from 'react'
import translations from "@public/text/translations"
import DevErr from "@utils/debug/devErr"
import DevLog from "@utils/debug/devLog"
import { useRouter } from 'next/router'

const useQuizDataBuilder = () => {
    const router = useRouter()
    const [questions, setQuestions] = useState()
    const [seed, setSeed] = useState()
    const [locationKey, setLocationKey] = useState()
    const [questionTypeKey, setQuestionTypeKey] = useState()
    const [params, setParams] = useState()
    const [questionNum, setQuestionNum] = useState()
    const [onFinish, setOnFinish] = useState()
    const [onBack, setOnBack] = useState()

    const build = () => {
        DevLog('Building Quiz Data...')
        let quizData = {}

        //TODO: Move question generation here
        let _questions = []
        if(questions) {
            for(var i = 0; i < questions.length; i ++) {
               _questions[_questions.length] = questions[i]
               let continueQuestion = translations.question_feedback[Math.floor(Math.random() * translations.question_feedback.length)]
               continueQuestion.questionFormatKey = "correctAnswer"
               
               _questions[_questions.length] = continueQuestion
            }
            quizData.questions = _questions
        } else {
            DevErr('No questions found when trying to build quiz data')
            return quizData
        }

        setRequiredField(quizData,'onFinish',onFinish,() => {router.push('/game/map')})
        
        if(onBack) {
            setRequiredField(quizData,'onBack',onBack)
        } else {
            setRequiredField(quizData,'onBack',generateOnBack())
        }
        setOptionalField(quizData,'locationKey', locationKey)
        setOptionalField(quizData,'questionTypeKey', questionTypeKey)
        setOptionalField(quizData,'seed', seed)
        setOptionalField(quizData,'params', params)
        
        const questionNumStr = questionNum ? questionNum.toString() : '0'
        setOptionalField(quizData,'questionNum', questionNumStr)

        
        DevLog('Built Quiz Data Succesfully...')
        DevLog(quizData)
        return quizData
    }

    const generateOnBack = () => {
        if(locationKey) {
            return () => {router.push('/game/' + locationKey)}
        } else {
            return () => {router.push('/game/map')}
        }
    }

    const setRequiredField = (quizData,fieldName, fieldValue, fallbackIfNull) => {
        if(fieldValue) {
            quizData[fieldName] = fieldValue
        } else {
            if(fallbackIfNull) {
                DevErr(`No "${fieldName}" found when trying to build quiz data. Setting default "${fieldName}"`)
                quizData[fieldName] = fallbackIfNull
            } else {
                DevErr(`No "${fieldName}" found when trying to build quiz data, and no fallback was provided`)
            }
        }
    }
    const setOptionalField = (quizData,fieldName, fieldValue) => {
        if(fieldValue) {
            quizData[fieldName] = fieldValue
        } else {
            DevErr(`No "${fieldName}" found when trying to build quiz data`)
        }
    }

    const quizDataBuilderSetters = {
        setQuestions,
        setSeed,
        setLocationKey,
        setQuestionTypeKey,
        setParams,
        setQuestionNum,
        setOnFinish,
        setOnBack
    }

    return {
        buildQuizData: build,
        quizDataBuilderSetters
    }

}

export default useQuizDataBuilder
