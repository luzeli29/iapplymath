import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout,useWrapperContext} from '@common_imports'
import generateOrderQuestions from '@utils/game/restaurant/generate_restaurant_question'
import Order from '@components/game/restuarant/Order'



export default function RestaurantQuestions() {
    const context = useWrapperContext();
    const router = useRouter();
    const order = context.state.order;
    const question = generateOrderQuestions(order)
    return (
        order ? 
            <GameQuestionLayout
                    questions={question}
                    onBack={() => router.push('/game/restaurant/')}
                    onFinish={() => 
                        {
                            router.push('/game/restaurant/outro')
                            return(<></>)
                        }}> 
                <Order order={order}/>
            </GameQuestionLayout>
            :
            <>
            </>
    )
}
