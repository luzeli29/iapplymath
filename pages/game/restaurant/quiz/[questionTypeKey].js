import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import generateRestaurantQuestions from '@utils/game/restaurant/generateRestaurantQuestion'
import Order from '@comps/game/restuarant/order'
import menuOptions from "@public/text/menuOptions"
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import useSeededRandom from '@hooks/useSeededRandom'
import DevLog from '@utils/debug/devLog'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'
import useQuizDataBuilder from '@hooks/quiz/useQuizDataBuilder'
import GameQuestionLayout from '@layouts/gameLayouts/gameQuestionLayout'


const RestaurantQuestions = ({user,settings}) => {
    const [loading, setLoading] = useState(true)
    const {buildQuizData, quizDataBuilderSetters} = useQuizDataBuilder()

    const router = useRouter()
    const { questionTypeKey, mainDishIndex, drinkIndex, dessertIndex, level, initSeed,initQnNum } = router.query
    const {seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom(initSeed)

    const orderIndex = {
        mainDishIndex:mainDishIndex,
        drinkIndex: drinkIndex,
        dessertIndex: dessertIndex
    }

    const order = {
        mainDish: menuOptions.mainDish[mainDishIndex],
        drink: menuOptions.drink[drinkIndex],
        dessert: menuOptions.dessert[dessertIndex]
    }

    const generatedQuestions = () => {
        DevLog('Generating question with seed: ' + seed)
        const generatedQuestions = generateRestaurantQuestions(order,randomGenerator,questionTypeKey,level)
        DevLog(generatedQuestions)
        return generatedQuestions
    }

    const createQuizData = (questions) => {
        try{
            const generatedQuestions = questions
            quizDataBuilderSetters.setQuestions(generatedQuestions)
            quizDataBuilderSetters.setLocationKey('restaurant')
            quizDataBuilderSetters.setSeed(seed)
            initQnNum ? quizDataBuilderSetters.setQuestionNum(initQnNum) 
                : quizDataBuilderSetters.setQuestionNum(0)
            quizDataBuilderSetters.setParams({...orderIndex, level})
            quizDataBuilderSetters.setQuestionTypeKey(questionTypeKey)
            quizDataBuilderSetters.setOnFinish(() => () => handleFinish())
        } catch {
            return false
        }
        return true
    }
    useEffect(()=> {
        if(seed) {
            const questions = generatedQuestions()
            createQuizData(questions)
            setLoading(false)  
        }
    },[seed])

    const handleFinish = () => {
        router.push('/dialog/restaurantOutro')
        setLoading(true)
    }

    if(loading) return <Loading/> 

    return (
            <GameQuestionLayout
                user={user}
                settings={settings}
                quizData={buildQuizData()}
                initQuestionNum={initQnNum}> 
                <Order order={orderIndex}/>
            </GameQuestionLayout>
    )
}

export default RetrieveUserContext(RestaurantQuestions,['gameReady','hasActiveGame'])