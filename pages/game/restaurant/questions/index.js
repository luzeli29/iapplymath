import React from 'react'
import {useWrapperContext} from '../../../../context/context'
import createOrderQuestions from '../../../../comps/game/restuarant/create_restaurant_question'
import QuestionLayout from '../../../../comps/game/layouts/question_layout'
import Order from '../../../../comps/game/restuarant/Order'
import {useRouter} from 'next/router'

export default function RestaurantQuestions() {
    var order = useWrapperContext().state.Order
    const router = useRouter();
    const questions = createOrderQuestions(order)
    return (
        <QuestionLayout
            questions={questions}
            onBack={() => router.push('/game/restaurant/')}
            onFinish={() => {
                router.push('/game/restaurant/outro')
                return(<></>)}}> 
            <Order order={order}/>
        </QuestionLayout>
    )
}
