import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout'
import Loading from '@comps/screens/loading';
import { useUserContext } from '@hooks/siteContext/useUserContext'
import useSeededRandom from '@hooks/useSeededRandom'
import DevLog from '@utils/debug/devLog';
import generateSchoolQuestions from '@utils/game/school/quiz/generateSchoolQuestions';
import LoadSchoolTopics from '@utils/game/school/quiz/schoolTopics/loadSchoolTopics';
import { useRouter } from 'next/router'
import Error from 'pages/error';
import Login from 'pages/user/login';
import React, { useEffect, useState } from 'react'

export async function getStaticPaths() {

    return {
        paths: [ {params: {questionTypeKey: 'basic'}}],
        fallback: false,
    };
}

export async function getStaticProps(){
    let schoolTopics = await LoadSchoolTopics()
    return {
      props: {
        schoolTopics,
      },
    }
  }
  

const SchoolQuiz = ({schoolTopics}) => {
    const {user,settings,loading, error} = useUserContext()
    const {seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom()
    const [questions, setQuestions] = useState()
    const router = useRouter()

    const { questionTypeKey, schoolTopicKey, level } = router.query
    const schoolTopic = schoolTopics[schoolTopicKey]

    useEffect(()=> {
        if(seed) {
        
            DevLog('Generating question with seed: ' + seed)
            const generatedQuestions = generateSchoolQuestions(questionTypeKey,schoolTopic,level,randomGenerator)
            setQuestions(generatedQuestions)
            DevLog(generatedQuestions)
        }
    },[seed])

    const isLoggedIn = user.loggedIn
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    if(!seed || !questions) return <Loading/>
  
    const lang = settings.lang

    return (
        <GameQuestionLayout
                    questions={questions}
                    onBack={() => router.push('/game/school/')}
                    onFinish={() => 
                        {
                            router.push('/game/school/outro')
                            return(<Loading/>)
                        }}> 
        </GameQuestionLayout>
    )
}

export default SchoolQuiz
