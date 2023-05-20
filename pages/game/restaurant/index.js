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
import useCookie from '@hooks/useCookie'


export default function Resturant () {
    const {user,settings,loading, error} = useUserContext()
    const [quizCookie, setQuizCookie , delQuizCookie] = useCookie('restaurant_quiz')
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


    useEffect(() => {   
        if (quizCookie != null && quizCookie != 'expires') {
            if (confirm("Hey! You have already started a test, do you want to continue it?")) {

                updateOrder({mainDish: quizCookie['mainDish']})
                updateOrder({drink: quizCookie['drink']})
                updateOrder({dessert: quizCookie['dessert']})
                router.push('/game/restaurant/basic/levelSelect?mainDishIndex=' + quizCookie['mainDish'] + '&drinkIndex=' + quizCookie['drink'] + '&dessertIndex=' + quizCookie['dessert'])         
            } else {
                delQuizCookie()
            }
        }
    }, [])

    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang

    function handleHover(dish) {
        if(dish) {
            setHoveredDish(dish);
        } else {
            setHoveredDish("");
        }
    }

    function handleDishClick(dishIndex, dishType) {
        switch(dishType) {
            case 'mainDish':
                updateOrder({mainDish: dishIndex})
                handleQuizCookie('mainDish', dishIndex)
                break;
            case 'drink':
                updateOrder({drink: dishIndex})
                handleQuizCookie('drink', dishIndex)
                break;
            case 'dessert':
                updateOrder({dessert: dishIndex})
                handleQuizCookie('dessert', dishIndex)
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



    const handleQuizCookie = (type, value) => {
        let data = {}
        if (quizCookie != "expires") {
            data = { ...quizCookie }
        }
        data[type] = value
        setQuizCookie(data, 7)
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
                    handleDishClick={(dishIndex,type) => handleDishClick(dishIndex,type)}
                    handleQuizCookie={handleQuizCookie}
                    />
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