import React from 'react'
import { useRouter } from 'next/router';
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext';
import loadLocations from '@utils/game/loadLocations';
import loadLevels from '@utils/game/quiz/levels/loadLevels';
import getText from '@utils/text/getText';
import useQuizCookies from '@hooks/quiz/useQuizCookies';
import Loading from '@comps/screens/loading';
import CreateParamString from '@utils/createParamString';

export async function getStaticPaths() {
    const locationsObj = await loadLocations()
    const locations = Object.keys(locationsObj)
    const keyPaths = [];
    for (let locationKey of locations) {
        const location = locationsObj[locationKey]
        for(let questionTypeKey of Object.keys(location.questionTypes)){
            keyPaths.push({ params: { locationKey, questionTypeKey}});
        }
    }
    return {
        paths: keyPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    const  {params}  = context
    const locationKey = params.locationKey
    const locationsObj = await loadLocations()
    const location =locationsObj[locationKey] 
    return {
      props: {
        location
      },
    }
}

const ActiveQuizRedirect = ({user,settings,location}) => {
    const router = useRouter()
    const routerQuery = router.query
    const lang = settings.lang
    const {quizCookie, removeQuizCookie} = useQuizCookies()

    const handleNewQuiz = () => {
        //TODO: Route user to screen they were on before
        router.push('/game/map')
        removeQuizCookie()
        return <Loading/>
    }

    const handleContinueQuiz = () => {
        const {seed,params,questionNum} = quizCookie
        const locationKey = routerQuery.locationKey
        const questionTypeKey = routerQuery.questionTypeKey
        const questionParams = location.questionTypes[questionTypeKey].questionParams

        let urlParams = {
            initSeed: seed,
            initQnNum: questionNum,
        }

        for(let paramKey of Object.keys(questionParams)){
            urlParams[paramKey] = params && params[paramKey]
        }

        const paramString = CreateParamString(urlParams)
        removeQuizCookie()
        router.push('/game/' + locationKey + '/quiz/' + questionTypeKey + paramString)
    }

    return (
        <div className='mx-auto'>
            <h1>{getText('active_quiz_found', lang)}</h1>
            <p>{getText('active_quiz_found_para', lang)}</p>
            <div className='row'>
                <div className='col-6'>
                    <button className='basic_button' onClick={handleContinueQuiz}>{getText('continue_active_quiz',lang)}</button>
                </div>
                <div className='col-6'>
                    <button className='basic_button' onClick={handleNewQuiz}>{getText('new_quiz',lang)}</button>
                </div>
            </div>
        </div>
    )
}

export default RetrieveUserContext(ActiveQuizRedirect,['loggedIn','requireActiveQuiz'])