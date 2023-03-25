import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout,useWrapperContext} from '@utils/imports/commonImports'
import generateOrderQuestions from '@utils/game/restaurant/generateRestaurantQuestion'
import Order from '@comps/game/restuarant/order'
import menuOptions from "@public/text/menuOptions"
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'


export default function RestaurantQuestions() {
    const {user,settings,loading, error} = useUserContext()

    const router = useRouter()
    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/> 
    if(!router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const { questionType, entreeIndex, drinkIndex, dessertIndex } = router.query

    const order = {
        entree: menuOptions.entree[entreeIndex],
        drink: menuOptions.drink[drinkIndex],
        dessert: menuOptions.dessert[dessertIndex]
    }

    const orderIndex = {
        entree:entreeIndex,
        drink: drinkIndex,
        dessert: dessertIndex
    }

    const questions = generateOrderQuestions(order)

    if(!questions) {
        router.push('/game/restaurant')
        return(<Loading/>)
    }

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
