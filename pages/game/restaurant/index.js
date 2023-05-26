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
    }, {mainDish: -1, drink: -1, dessert: -1})

     useEffect(() => {
        setMenu(getMenu());
        setBudget(Math.floor(Math.random() * 3) + 10)
    }, [router.isReady]);

    const handleOrderMenu = () => {
        updateOrder({mainDish: -1})
        updateOrder({drink: -1})
        updateOrder({dessert: -1})

        setMenu(getMenu());
        setBudget(Math.floor(Math.random() * 3) + 10)
    }


    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang

    function handleOrderComplete() {
        //TODO: Validate the parms
        router.push('/game/restaurant/quiz/' + 'basic' + '?mainDishIndex=' + order.mainDish + '&drinkIndex=' + order.drink + '&dessertIndex=' + order.dessert)
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
                updateOrder({mainDish: dishIndex})
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

        if(order.mainDish == -1) {
            setInstructionText("missing_item_instructions")
        } else if (order.drink == -1) {
            setInstructionText("missing_item_instructions")
        } else if (order.dessert == -1) {
            setInstructionText("missing_item_instructions")
        } else if (menuOptions.mainDish[order.mainDish].price + 
                menuOptions.drink[order.drink].price + 
                menuOptions.dessert[order.dessert].price > budget) {
            setInstructionText("too_expensive_order_instructions")
        } else {
            router.push('/game/restaurant/basic/levelSelect?mainDishIndex=' + order.mainDish + '&drinkIndex=' + order.drink+ '&dessertIndex=' + order.dessert)         
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
                        budget={budget}
                        handleOrderMenu={handleOrderMenu}
                    />
                </div>
            </div>
        </GameIndexLayout>
    )
}