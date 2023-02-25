import React, {useState,useEffect, useReducer} from 'react'
import {useRouter} from 'next/router'
import {useWrapperContext,GameIndexLayout} from '@common_imports'
import style from '@styles/restaurant.module.css'
import getMenu from '@utils/game/restaurant/get_menu'
import ItemDescription from '@components/game/restuarant/ItemDescription'
import Order from '@components/game/restuarant/Order'
import Menu from '@components/game/restuarant/Menu'

const Resturant = () => {
    const context = useWrapperContext()
    const lang = context.state.lang
    const router = useRouter()

    const [hoveredDish, setHoveredDish] = useState()
    const [menu, setMenu] = useState()
    const [instructionText, setInstructionText] = useState("menu_select_instructions")

    const [budget,setBudget] = useState()
    const [order, updateOrder] = useReducer((prev,next) => {
        return{...prev,...next}
    }, {entree: '', drink: '', dessert: ''})

    function handleOrderComplete() {
        router.push('/game/restaurant/questions')
    }

    useEffect(() => {
        setMenu(getMenu());
        setBudget(Math.floor(Math.random() * 3) + 10)
    }, []);



    function handleHover(dish) {
        if(dish) {
            setHoveredDish(dish);
        } else {
            setHoveredDish("");
        }
    }

    function handleDishClick(dish, dishType) {
        switch(dishType) {
            case 'entree':
                updateOrder({entree: dish})
                break;
            case 'drink':
                updateOrder({drink: dish})
                break;
            case 'dessert':
                updateOrder({dessert: dish})
                break;
        }
    }
    function handleOrderComplete() {

        if(!order.entree) {
            setInstructionText("missing_item_instructions")
        } else if (!order.drink) {
            setInstructionText("missing_item_instructions")
        } else if (!order.dessert) {
            setInstructionText("missing_item_instructions")
        } else if (order.entree.price + 
                    order.drink.price + 
                    order.dessert.price > budget) {
            setInstructionText("too_expensive_order_instructions")
        } else {
            context.setOrder(order)
            router.push('/game/restaurant/questions')        
        }
    }
      
    return (
        <GameIndexLayout
                lang={lang}
                game_name={"restaurant"}
                instruction_text={instructionText}
                submit_text={"order"}
                handleSubmit={() => handleOrderComplete()}>
            <div className={style.ms_container}>
                <Menu 
                    menu={menu} 
                    handleHover={(dish) => handleHover(dish)}
                    handleDishClick={(dish,type) => handleDishClick(dish,type)}/>
                <div className={style.decription_container}>
                    <ItemDescription hoveredDish={hoveredDish} budget={budget}/>
                </div>
                <div className={style.ms_order_container}>
                    <Order 
                        order={order}
                        budget={budget}/>
                </div>
            </div>
        </GameIndexLayout>
    )
}

export default Resturant