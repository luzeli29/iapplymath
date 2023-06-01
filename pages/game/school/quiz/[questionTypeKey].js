import Loading from '@comps/screens/loading';
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext';
import useQuizDataBuilder from '@hooks/quiz/useQuizDataBuilder';
import useSeededRandom from '@hooks/useSeededRandom'
import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout';
import DevLog from '@utils/debug/devLog';
import generateSchoolQuestions from '@utils/game/school/quiz/generateSchoolQuestions';
import LoadSchoolTopics from '@utils/game/school/quiz/schoolTopics/loadSchoolTopics';
import { useRouter } from 'next/router'
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
  

const SchoolQuiz = ({user,settings,schoolTopics}) => {
    const {buildQuizData, quizDataBuilderSetters} = useQuizDataBuilder()

    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const { questionTypeKey, schoolTopicKey, level, initSeed, initQnNum } = router.query
    const {seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom(initSeed)
    const schoolTopic = schoolTopics[schoolTopicKey]

    const generatedQuestions = () => {
        DevLog('Generating question with seed: ' + seed)
        const generatedQuestions = generateSchoolQuestions(questionTypeKey,schoolTopic,level,randomGenerator)
        DevLog(generatedQuestions)
        return generatedQuestions
    }

    useEffect(()=> {
        if(seed) {
            const questions = generatedQuestions()
            createQuizData(questions)
            setLoading(false)
        }
    },[seed])

    const createQuizData = (questions) => {
        try{
            const generatedQuestions = questions
            quizDataBuilderSetters.setQuestions(generatedQuestions)
            quizDataBuilderSetters.setSeed(seed)
            quizDataBuilderSetters.setParams()
            quizDataBuilderSetters.setQuestionTypeKey(questionTypeKey)
            quizDataBuilderSetters.setOnFinish(() => () => handleFinish())
            quizDataBuilderSetters.setLocationKey('school')
            initQnNum ? quizDataBuilderSetters.setQuestionNum(initQnNum) 
                : quizDataBuilderSetters.setQuestionNum(0)
            quizDataBuilderSetters.setParams({schoolTopicKey, level})
        } catch {
            return false
        }
        return true
    }

    if(!router.isReady) return <Loading/>
  
    const lang = settings.lang

    return (
        <GameQuestionLayout
            user={user}
            settings={settings}
            quizData={buildQuizData()}
            initQuestionNum={initQnNum}> 
        </GameQuestionLayout>
    )
}

export default RetrieveUserContext(SchoolQuiz,['gameReady','hasActiveGame'])