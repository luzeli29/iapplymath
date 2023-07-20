import Loading from '@comps/screens/loading';
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext';
import useQuizDataBuilder from '@hooks/quiz/useQuizDataBuilder';
import useSeededRandom from '@hooks/useSeededRandom'
import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout';
import serverSeededRandom from '@utils/crypto/serverSeededRandom';
import DevErr from '@utils/debug/devErr';
import DevLog from '@utils/debug/devLog';
import generateGroceryStoreQuestions from '@utils/game/groceryStore/quiz/generateGroceryStoreQuestions';
import LoadSchoolTopics from '@utils/game/school/quiz/schoolTopics/loadSchoolTopics';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export async function getServerSideProps(context){
    const { questionTypeKey, level, initSeed, initQnNum } = context.query
    const {seed, randomGenerator} = serverSeededRandom(initSeed)
    const questions = generateGroceryStoreQuestions(questionTypeKey,level,randomGenerator)
    return {
      props: {
        questions,
        seed
      },
    }
  }
  

const GroceryStoreQuiz = ({user,settings,questions,seed}) => {
  const {buildQuizData, quizDataBuilderSetters} = useQuizDataBuilder()

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { questionTypeKey, level, initQnNum } = router.query

  const handleFinish = () => {
      router.push('/dialog/groceryStoreOutro')
      setLoading(true)
  }

  useEffect(()=> {
      if(seed) {
          createQuizData(questions)
          setLoading(false)
      }
  },[seed])

  const createQuizData = (questions) => {
      try{
          quizDataBuilderSetters.setQuestions(questions)
          quizDataBuilderSetters.setSeed(seed)
          quizDataBuilderSetters.setParams()
          quizDataBuilderSetters.setQuestionTypeKey(questionTypeKey)
          quizDataBuilderSetters.setOnFinish(() => () => handleFinish())
          quizDataBuilderSetters.setLocationKey('school')
          initQnNum ? quizDataBuilderSetters.setQuestionNum(initQnNum) 
              : quizDataBuilderSetters.setQuestionNum(0)
          quizDataBuilderSetters.setParams({level})
      } catch {
          return false
      }
      return true
  }

  if(!router.isReady) return <Loading/>

  const lang = settings.lang
  if(loading) {
      return <Loading/>
  }
    return (
        <GameQuestionLayout
            user={user}
            settings={settings}
            quizData={buildQuizData()}
            initQuestionNum={initQnNum}> 
        </GameQuestionLayout>
    )
}

export default RetrieveUserContext(GroceryStoreQuiz,['gameReady','hasActiveGame'])