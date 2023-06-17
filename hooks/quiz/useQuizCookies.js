import React, {useEffect, useState} from 'react'
import DevLog from '@utils/debug/devLog'
import Cookies from 'js-cookie';
import DevErr from '@utils/debug/devErr';
import { useRouter } from 'next/router';
import useCookies from '@hooks/useCookies';

const quizCookieName = 'activeQuiz'

const useQuizCookies = () => {
    const [quizCookie, setQuizCookie ] = useState()
    const {useCookieData, setCookie, removeCookie, getCookie} = useCookies()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        setLocalFromCookie()
        setLoading(false)
    },[])

    const setLocalFromCookie = () => {
        const cookie = getCookie(quizCookieName)
        setQuizCookie(cookie)
    }

    const createQuizCookie = (quizData) => {
        if(!quizData) {
            DevErr('Failed to create Quiz Cookie, "quizData" was null.')
            setError('Failed to create Quiz Cookie, "quizData" was null.')
            return
        }
        
        try{
            const cleanedQuizData = cleanQuizData(quizData)

            const activeQuizData = {
                ...cleanedQuizData,

            }
            
            setCookie(quizCookieName,activeQuizData)
            DevLog('Created Quiz Cookie Succesfully...')

            setQuizCookie(activeQuizData)
            return true

        } catch(e) {
            DevErr('Failed to create Quiz Cookie...' + e)
            setError('Failed to create Quiz Cookie...')
            return false
        }
    }

    const hasActiveCookie = () => {
        if(quizCookie && !quizCookie.finished) {
            return true
        }

        return false
    }

    const removeQuizCookie = () => {
        
        const removedCookie = removeCookie(quizCookieName)

        if(!removedCookie) {
            DevErr('Failed to remove Quiz Cookie...')
            setLocalFromCookie()
            return false
        }

        setQuizCookie({})
        return true
    }

    const handleLogout = () => {

        if(hasActiveCookie()) {
            storeActiveQCToDB()
            removeQuizCookie()
            return true
        }

        removeCookie(quizCookieName)
        return true
    }

    const handleLogin = () => {
        try{
            throw new Error('Function not implemented.')
        } catch(e) {
            DevErr('Failed to handle login setup for Quiz Cookies ...' + e)
            return false
        }
    }

    const storeActiveQCToDB = () => {
        if(!quizCookie) {
            DevErr('Tried to store active Quiz Cookie to DB, but cookie was null.')
            return false 
        }
        try{
            throw new Error('Function not implemented.')
        } catch (e) {
            DevErr('Failed to store active Quiz Cookie to DB...' + e)
            return false
        }
    }

    const quizCookieInfo = {
        loading,
        error
    }
    return {
        quizCookieInfo,
        quizCookie,
        createQuizCookie,
        hasActiveCookie,
        handleLogout,
        removeQuizCookie,
        handleLogin
    }
}

const cleanQuizData = (quizData) => {
    let cleanedQuizData = {}

    if(!quizData) {
        DevErr('Failed to clean Quiz Data, "quizData" was null.')
        throw new Error('Failed to clean Quiz Data, "quizData" was null.')
    }

    if(!quizData.questions) {
        DevErr('Failed to clean Quiz Data, "questions" field in "quizData" was null.')
        throw new Error('Failed to clean Quiz Data, "questions" field in "quizData" was null.')
    }

    const maxQuestionNum = quizData.questions.length

    const addRequiredField = (key,value) => {
        if(!value) {
            DevErr('Field ' + key + ' in "quizData" was null.')
            throw new Error('Field ' + key + ' in "quizData" was null.')
        }

        cleanedQuizData[key] = value
    }

    const addOptionalField = (key,value) => {
        if(value) cleanedQuizData[key] = value
        else DevErr('Field ' + key + ' in "quizData" was null.')
    }

    try{
        addRequiredField('locationKey', quizData.locationKey)
        addRequiredField('questionTypeKey', quizData.questionTypeKey)
        addRequiredField('maxQuestionNum', maxQuestionNum)

        addOptionalField('seed', quizData.seed)
        addOptionalField('params', quizData.params)
        addOptionalField('questionNum', quizData.questionNum)
    } catch(e) {
        DevErr('Failed to clean Quiz Data...' + e)
        return cleanedQuizData
    }

    return cleanedQuizData
}

export default useQuizCookies
