import React from 'react'
import {useWrapperContext} from '../../../../context/context'
import createOrderQuestions from '../../../../comps/game/restuarant/create_restaurant_question'

export default function RestaurantQuestions() {
    const order = useWrapperContext().state.Order
    console.log(order)
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
