import React, {useState,useEffect,useMemo} from 'react'
import {useRouter} from 'next/router'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import loadRecipes from '@public/data/recipeData/loadRecipes'
import aHQuestionFactory from '@utils/game/auntHouse/questionCreation/aHQuestionFactory'
import IngredientList from '@comps/game/auntHouse/ingredientList'
import generateRecipeTitleText from '@utils/game/recipes/textCreation/generateRecipeTitleText'
import generateRecipeServingText from '@utils/game/recipes/textCreation/generateRecipeServingText'
import loadLocations from '@utils/game/loadLocations'
import useQuizDataBuilder from '@hooks/quiz/useQuizDataBuilder'
import DevLog from '@utils/debug/devLog'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'
import useSeededRandom from '@hooks/useSeededRandom'
import DevErr from '@utils/debug/devErr'
import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout'
import getText from '@utils/text/getText'
import loadSports from '@utils/game/stadium/sportData/loadSports'
import GenerateStadiumQuestions from '@utils/game/stadium/questionCreation/generateStadiumQuestions'
import stadiumImg from '@public/img/court/court_bg.png'
import Image from 'next/image'

const CourtQuestions = ({user,settings}) => {
    const router = useRouter()
    const { questionTypeKey, sportKey, level, initSeed,initQnNum} = router.query
    const {seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom(initSeed)

    const {buildQuizData, quizDataBuilderSetters} = useQuizDataBuilder()
    const [loading, setLoading] = useState(true)
    
    //FIXME: FAMILY SIZE is always undefined here
    const lang = settings.lang

    const generateQuestions = () => {
        if(!seed) return null
        DevLog('---Generating questions w/ Seed ' + seed + '---')
        try {
            const questions = GenerateStadiumQuestions('basketball',level,randomGenerator)
            DevLog(questions)
            return questions
        } catch(e) {
            DevErr('Error generating questions ' + e)
            return null
        }
    }

    const createQuizData = (questions) => {
        try{
            const generatedQuestions = questions
            quizDataBuilderSetters.setQuestions(generatedQuestions)
            quizDataBuilderSetters.setLocationKey('court')
            quizDataBuilderSetters.setSeed(seed)
            initQnNum ? quizDataBuilderSetters.setQuestionNum(initQnNum) 
                : quizDataBuilderSetters.setQuestionNum(0)
            quizDataBuilderSetters.setParams({
                level: level,
                sportKey: "basketball",
            })
            quizDataBuilderSetters.setQuestionTypeKey(questionTypeKey)
            quizDataBuilderSetters.setOnFinish(() => () => handleFinish())
        } catch {
            return false
        }
        return true
    }

    const handleFinish = () => {
        router.push('/game/court/finished')
        setLoading(true)
    }

    useEffect(() => {
        if(seed) {
            const questions = generateQuestions()
            createQuizData(questions)
            setLoading(false)
        }
    }, [seed,questionTypeKey])

    const render = () => {
        if(loading) return <Loading/>
        return (
            <GameQuestionLayout
                user={user}
                settings={settings}
                quizData={buildQuizData()}
                initQuestionNum={initQnNum}> 
                <div>
                    <Image 
                    priority={true}
                    layout={"fill"}
                    objectFit = {'contain'}
                    quality={100}
                    src={stadiumImg}
                    alt={"stadium"} />
                </div>   
            </GameQuestionLayout>
        )
    }

    return render()
}

export default RetrieveUserContext(CourtQuestions,['gameReady','hasActiveGame'])