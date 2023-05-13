import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout} from '@utils/imports/commonImports'
import generateRestaurantQuestions from '@utils/game/restaurant/generateRestaurantQuestion'
import Order from '@comps/game/restuarant/order'
import menuOptions from "@public/text/menuOptions"
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import useSeededRandom from '@hooks/useSeededRandom'
import DevLog from '@utils/debug/devLog'


export default function RestaurantQuestions() {
    const {user,settings,loading, error} = useUserContext()
    const {seed,setSeed,regenerateSeed, randomGenerator} = useSeededRandom()
    const [questions, setQuestions] = useState()
    const router = useRouter()

    const { questionType, mainDishIndex, drinkIndex, dessertIndex } = router.query

    const orderIndex = {
        mainDish:mainDishIndex,
        drink: drinkIndex,
        dessert: dessertIndex
    }

    const order = {
        mainDish: menuOptions.mainDish[mainDishIndex],
        drink: menuOptions.drink[drinkIndex],
        dessert: menuOptions.dessert[dessertIndex]
    }

    useEffect(()=> {
        if(seed) {
        
            DevLog('Generating question with seed: ' + seed)
            setQuestions(generateRestaurantQuestions(order,randomGenerator))
        }
    },[seed])

    const isLoggedIn = user.loggedIn    
    if(loading || !seed || !questions) return <Loading/> 
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    return (
            <GameQuestionLayout
                    questions={questions}
                    onBack={() => router.push('/game/restaurant/')}
                    onFinish={() => 
                        {
                            router.push('/game/restaurant/outro')
                            return(<Loading/>)
                        }}> 
                <Order order={orderIndex}/>
            </GameQuestionLayout>
    )
}
