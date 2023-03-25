import React, {useState,useEffect, useReducer} from 'react'
import {useRouter} from 'next/router'
import {GameIndexLayout} from '@utils/imports/commonImports'
import style from '@styles/restaurant.module.css'
import getMenu from '@utils/game/restaurant/getMenu'
import ItemDescription from '@comps/game/restuarant/itemDescription'
import Order from '@comps/game/restuarant/order'
import Menu from '@comps/game/restuarant/menu'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import menuOptions from "@public/text/menuOptions"


function getMenuItemFromIndex(dishType,index) {
    
}

export default function Resturant () {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const [hoveredDish, setHoveredDish] = useState()
    const [menu, setMenu] = useState()
    const [instructionText, setInstructionText] = useState("menu_select_instructions")

    const [budget,setBudget] = useState()
    const [order, updateOrder] = useReducer((prev,next) => {
        return{...prev,...next}
    }, {entree: -1, drink: -1, dessert: -1})

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
        //TODO: Validate the parms
        router.push('/game/restaurant/quiz/' + 'basic' + '?entreeIndex=' + order.entree + '&drinkIndex=' + order.drink + '&dessertIndex=' + order.dessert)
    }

    function handleHover(dish) {
        if(dish) {
            setHoveredDish(dish);
        } else {
            setHoveredDish("");
        }
    }

    function handleDishClick(dishType, dishIndex) {
        switch(dishType) {
            case 'entree':
                updateOrder({entree: dishIndex})
                break;
            case 'drink':
                updateOrder({drink: dishIndex})
                break;
            case 'dessert':
                updateOrder({dessert: dishIndex})
                break;
        }
    }
    function handleOrderComplete() {

        if(order.entree == -1) {
            setInstructionText("missing_item_instructions")
        } else if (order.drink == -1) {
            setInstructionText("missing_item_instructions")
        } else if (order.dessert == -1) {
            setInstructionText("missing_item_instructions")
        } else if (menuOptions.entree[order.entree].price + 
                menuOptions.drink[order.drink].price + 
                menuOptions.dessert[order.dessert].price > budget) {
            setInstructionText("too_expensive_order_instructions")
        } else {
            router.push('/game/restaurant/quiz/basic?entreeIndex=' + order.entree + '&drinkIndex=' + order.drink+ '&dessertIndex=' + order.dessert)         
        }
    }
      
    if(!menu) return <Loading/>

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
                    handleDishClick={(dishIndex,type) => handleDishClick(dishIndex,type)}/>
                <div className={style.decription_container}>
                    <ItemDescription lang={lang} hoveredDish={hoveredDish} budget={budget}/>
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