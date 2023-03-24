import React, {useState,useEffect, useReducer} from 'react'
import {useRouter} from 'next/router'
import {useWrapperContext,GameIndexLayout} from '@utils/imports/commonImports'
import style from '@styles/restaurant.module.css'
import getMenu from '@utils/game/restaurant/getMenu'
import ItemDescription from '@comps/game/restuarant/itemDescription'
import Order from '@comps/game/restuarant/order'
import Menu from '@comps/game/restuarant/menu'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'

const Resturant = () => {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const [hoveredDish, setHoveredDish] = useState()
    const [menu, setMenu] = useState()
    const [instructionText, setInstructionText] = useState("menu_select_instructions")

    const [budget,setBudget] = useState()
    const [order, updateOrder] = useReducer((prev,next) => {
        return{...prev,...next}
    }, {entree: '', drink: '', dessert: ''})

     useEffect(() => {
        setMenu(getMenu());
        setBudget(Math.floor(Math.random() * 3) + 10)
    }, [router.isReady]);

    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang

    function handleOrderComplete() {
        router.push('/game/restaurant/questions')
    }

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
      
    if(!order || !menu) return <></>

    return (
        <GameIndexLayout
                lang={lang}
                game_name={"restaurant"}
                instruction_text={instructionText}
                submit_text={"order"}
                handleSubmit={() => handleOrderComplete()}>
            <div className={style.ms_container}>
                <Menu 
                    lang={lang}
                    menu={menu} 
                    handleHover={(dish) => handleHover(dish)}
                    handleDishClick={(dish,type) => handleDishClick(dish,type)}/>
                <div className={style.decription_container}>
                    <ItemDescription hoveredDish={hoveredDish} budget={budget}/>
                </div>
                <div className={style.ms_order_container}>
                    <Order 
                        lang={lang}
                        order={order}
                        budget={budget}/>
                </div>
            </div>
        </GameIndexLayout>
    )
}

export default Resturant