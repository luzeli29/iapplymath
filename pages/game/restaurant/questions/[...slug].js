import React from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout} from '@common_imports'
import generateOrderQuestions from '@utils/game/restaurant/generate_restaurant_question'
import Order from '@components/game/restuarant/Order'
import getMenuItem from '@utils/game/restaurant/getMenuItem'

export default function RestaurantQuestions() {
    const router = useRouter();
    const { entree_index, drink_index, dessert_index } = router.query
    console.log(router.query)
    const orderIndex = {
        entree: entree_index,
        drink: drink_index,
        dessert: dessert_index
    }
    const questions = generateOrderQuestions(orderIndex)

    return (
        <GameQuestionLayout
            questions={questions}
            onBack={() => router.push('/game/restaurant/')}
            onFinish={() => {
                router.push('/game/restaurant/outro')
                return(<></>)}}> 
            <Order order={orderIndex}/>
        </GameQuestionLayout>
    )
}
