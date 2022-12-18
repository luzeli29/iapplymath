import React, {useState,useReducer} from 'react'
import {useWrapperContext} from '../../../context/context'
import {useRouter} from 'next/router'
import GameIndexLayout from '../../../comps/game/layouts/game_index_layout'
import style from '../../../styles/restaurant.module.css'
import getMenu from '../../../comps/game/restuarant/get_menu'
import MenuButton from '../../../comps/game/restuarant/MenuButton'
import ItemDescription from '../../../comps/game/restuarant/ItemDescription'
import Order from '../../../comps/game/restuarant/Order'

//Main Resturant game
export default function Restaurant () {
    //get context and lang
    const context = useWrapperContext()

    //get router to switch pages
    const router = useRouter()

    //set budget and order as hooks
    const [budget,setBudget] = useState(Math.floor(Math.random() * 3) + 10)
    const [order, setOrder] = useState({
        dishes: {
            entree: "",
            drink: "",
            desert: "",
        },
        total: 0,
    })
    
    //handle completing order
    const handleOrderComplete = () => {
        if(order.dishes.entree == "" || order.dishes.drink == "" || order.dishes.desert == "" || order.total > budget) {
            //Order was bad, do nothing
            //TODO: add player feedback
        } else {
            console.log(order)

            context.setOrder(order)
            router.push('/game/restaurant/questions')        
        }

    }

    return (
        <MenuSelect
            order={order}
            setOrder={(newOrder) => setOrder(newOrder)}
            handleOrderComplete={() => handleOrderComplete()}
            budget={budget}
            menu={getMenu()}/>
    )
}


//menu select screen
const MenuSelect = ({handleOrderComplete,budget,order,setOrder, menu}) => {
    //get lang from context
    const lang = useWrapperContext().state.lang
    //get menu from public

    //remembers what dish player is hovering on, or nothing
    const [hovering, setHovering] = useState("")
    //used to route back to map
    const router = useRouter()

    //force update so when button clicked view is updated
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    //handles when a dish button is clicked
    const handleDishClick = () => {
        const newOrder = order
        newOrder.dishes[hovering["type"]] = hovering

        //calculate new total
        const entreePrice = 0
        const drinkPrice = 0
        const desertPrice = 0
        if(!isNaN(newOrder.dishes.entree.price)) {
            entreePrice = newOrder.dishes.entree.price
        }
        if(!isNaN(newOrder.dishes.drink.price)) {
            drinkPrice = newOrder.dishes.drink.price
        }
        if(!isNaN(newOrder.dishes.desert.price)) {
            desertPrice = newOrder.dishes.desert.price
        }
        const total = entreePrice + drinkPrice + desertPrice
        newOrder.total = total
        setOrder(newOrder)
        //forces an update
        forceUpdate();
    }


    return (
        <GameIndexLayout
            lang={lang}
            game_name={"restaurant"}
            instruction_text={"menu_select_instructions"}
            submit_text={"order"}
            handleSubmit={() => handleOrderComplete()}>
        
            <div className={style.ms_container}>
                <div className={style.menu_grid}>
                    <p className={style.menu_titles}><b>Entrees</b></p>
                    <div className={style.five_grid}>
                        {menu.entre.map((dish) => {
                            return (
                                    <MenuButton 
                                        key={dish.en}
                                        dish={dish}
                                        handleEnter={(dish) => setHovering(dish)}
                                        handlerLeave={() => setHovering("")}
                                        handleClick={() => handleDishClick()}/>
                                    
                        )})}
                    </div>
                    <p className={style.menu_titles}><b>Drinks</b></p>
                    <div className={style.three_grid}>

                        {menu.drink.map((dish) => {
                            return (
                                <MenuButton 
                                        key={dish.en}
                                        dish={dish}
                                        handleEnter={(dish) => setHovering(dish)}
                                        handlerLeave={() => setHovering("")}
                                        handleClick={() => handleDishClick()}/>
                                )
                        })}
                    </div>
                    <p className={style.menu_titles}><b>Desert</b></p>
                    <div className={style.three_grid}>
                        {menu.desert.map((dish) => {
                                return (
                                    <MenuButton 
                                        key={dish.en}
                                        dish={dish}
                                        handleEnter={(dish) => setHovering(dish)}
                                        handlerLeave={() => setHovering("")}
                                        handleClick={() => handleDishClick()}/>
                                )
                            })}
                    </div>
                </div>
                <div className={style.decription_container}>
                    <ItemDescription hovering={hovering} budget={budget}/>
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
