import React from 'react'
import {useRouter} from 'next/router'
import {useWrapperContext,GameQuestionLayout} from '@common_imports'
import generateOrderQuestions from '@utils/game/restaurant/generate_restaurant_question'
import Order from '@components/game/restuarant/Order'

export default function RestaurantQuestions() {
    var order = useWrapperContext().state.Order
    const router = useRouter();
    const questions = generateOrderQuestions(order)
    return (
        <GameQuestionLayout
            questions={questions}
            onBack={() => router.push('/game/restaurant/')}
            onFinish={() => {
                router.push('/game/restaurant/outro')
                return(<></>)}}> 
            <Order order={order}/>
        </GameQuestionLayout>
    )
}
