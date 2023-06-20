import React, {useState,useEffect, useReducer} from 'react'
import {useRouter} from 'next/router'
import GameIndexLayout from '@layouts/gameLayouts/gameIndexLayout'
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
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'


function getMenuItemFromIndex(dishType,index) {
    
}

const Resturant = ({user,settings}) => {
    const router = useRouter()

    const [hoveredDish, setHoveredDish] = useState()
    const [menu, setMenu] = useState()
    const [instructionText, setInstructionText] = useState("menu_select_instructions")

    const [budget,setBudget] = useState()
    const [order, updateOrder] = useReducer((prev,next) => {
        return{...prev,...next}
    }, {mainDishIndex: -1, drinkIndex: -1, dessertIndex: -1})

     useEffect(() => {
        setMenu(getMenu());
        // set budget to be between 12 and 16
        setBudget(Math.floor(Math.random() * 5) + 12)
    }, [router.isReady]);

    const lang = settings.lang

    function handleOrderComplete() {
        //TODO: Validate the parms
        router.push('/game/restaurant/quiz/' + 'basic' + '?mainDishIndex=' + order.mainDishIndex + '&drinkIndex=' + order.drinkIndex + '&dessertIndex=' + order.dessertIndex)
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
            case 'mainDish':
                updateOrder({mainDishIndex: dishIndex})
                break;
            case 'drink':
                updateOrder({drinkIndex: dishIndex})
                break;
            case 'dessert':
                updateOrder({dessertIndex: dishIndex})
                break;
        }
    }
    function handleOrderComplete() {

        if(order.mainDishIndex == -1) {
            setInstructionText("missing_item_instructions")
        } else if (order.drinkIndex == -1) {
            setInstructionText("missing_item_instructions")
        } else if (order.dessertIndex == -1) {
            setInstructionText("missing_item_instructions")
        } else if (menuOptions.mainDish[order.mainDishIndex].price + 
                menuOptions.drink[order.drinkIndex].price + 
                menuOptions.dessert[order.dessertIndex].price > budget) {
            setInstructionText("too_expensive_order_instructions")
        } else {
            router.push('/game/restaurant/basic/levelSelect?mainDishIndex=' + order.mainDishIndex + '&drinkIndex=' + order.drinkIndex+ '&dessertIndex=' + order.dessertIndex)         
        }
    }
      
    if(!menu) return <Loading/>

    return (
        <GameIndexLayout
                lang={lang}
                gameName={"restaurant"}
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


export default RetrieveUserContext(Resturant,['gameReady','hasActiveGame'])