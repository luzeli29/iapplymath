import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout,useWrapperContext} from '@utils/imports/commonImports'
import generateOrderQuestions from '@utils/game/restaurant/generateRestaurantQuestion'
import Order from '@comps/game/restuarant/order'



export default function RestaurantQuestions() {
    const context = useWrapperContext();
    const router = useRouter();
    const order = context.state.order;

    const [questions, setQuestions] = useState()

    useEffect(() => {
        setQuestions(generateOrderQuestions(order))
    },[]);

    if(!questions) return <></>

    return (
        order ? 
            <GameQuestionLayout
                    questions={questions}
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
