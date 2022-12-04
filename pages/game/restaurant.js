import React, {useState,useReducer} from 'react'
import Dialog from '../../comps/dialog/dialog'
import {useWrapperContext} from '../../context/context'
import style from '../../styles/restaurant.module.css'
import getMenu from '../../comps/game/resturant_menu'
import {useRouter} from 'next/router'
import BasicGameLayout from '../../comps/game/basic_game_layout'
import QuestionLayout from '../../comps/game/question_layout'
import FinishScreen from '../../comps/game/finish_layout'

//Main Resturant game
export default function Restaurant () {
    //get context and lang
    const context = useWrapperContext()
    const lang = context.state.lang

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

    //state to tell page wehre the player is in reletive to game
    const [state, setState] = useState("intro_dialog")

    //handle completing order
    const handleOrderComplete = () => {
        if(order.dishes.entree == "" || order.dishes.drink == "" || order.dishes.desert == "" || order.total > budget) {
            //Order was bad, do nothing
            //TODO: add player feedback
        } else {
            //switch states to start game
            setState("game")
        }

    }

    //Generate questions with the order state
    const generateOrderQuestions = () => {
        var questions = [];
        questions[0] = {
            en:"How much was your order?",
            es:"¿Cuánto es el total?",
            answer: order.total,
            answer_format: "money",
        }

        questions[1] = {
            en:"How much is the total if you remove the most expensive item?",
            es:"¿Cuánto es el total si no compras el plato más caro?",
            answer: order.total - Math.max.apply(Math, Object.values(order.dishes).map(function(dish) {return dish.price;})),
            answer_format: "money",
        }

        questions[2] = {
            en:"How much is your total if you remove the least expensive item?",
            es:"¿Cuánto es el total si no compras el plato más barato?",
            answer: order.total - Math.min.apply(Math, Object.values(order.dishes).map(function(dish) {return dish.price;})),
            answer_format: "money",
        }
        //TODO add more questions?

        return questions
    }

    //Component where user can continue playing aunts or go to map
    const EndChoice = () => {
        return (
            <FinishScreen 
                lang={lang}
                game_name="restaurant"
                restart_text="menu_select"
                handleRestart={() => handleRestartGame()}>
            </FinishScreen>
        )
    }

    //handles if the player returns to menu_select
    const handleRestartGame = () => {
        setOrder({
            dishes: {
                entree: "",
                drink: "",
                desert: "",
            },
            total: 0,
        })
        setBudget(Math.floor(Math.random() * 3) + 10)
        setState("menu_select")
    }

    //switch what is rendered depending on state
    switch(state) {
        case "intro_dialog" :
            return (<Dialog
                        scriptId={"resturant_intro"}
                        onEnd={() => setState("menu_select")}/>)
        case "menu_select" :
            return (<MenuSelect
                order={order}
                setOrder={(newOrder) => setOrder(newOrder)}
                handleOrderComplete={() => handleOrderComplete()}
                budget={budget}
                menu={getMenu()}/>)
        case "game" : 
            return (
                <QuestionLayout
                    questions={generateOrderQuestions()}
                    onBack={() => setState("menu_select")}
                    onFinish={() => {
                        setState("outro_dialog")
                        return(<></>)}}> 
                    <Order order={order}/>
                </QuestionLayout>
            )
        case "outro_dialog" :
            return (<Dialog
                scriptId={"resturant_outro"}
                onEnd={() => setState("finish_screen")}/>)
        case "finish_screen" : 
            return (
                <EndChoice/>
            )
    }
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
        <BasicGameLayout
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
        </BasicGameLayout>
    )
}

//Item description shown when player hovers over button
const ItemDescription = ({hovering,budget}) => {
    const lang = useWrapperContext().state.lang
    return (
        <div>
            <p>{lang =="en" ? "Budget - $" + budget+ ".00" : "Presupuesto - $" + budget+ ".00"}</p>
            {hovering == "" ? 
            <></>
                :
            <>
                <p className={style.desc_font}>{hovering[lang]}</p>
                <p className={style.desc_font}>${hovering.price}.00</p>
                <div className={style.desc_img_container}>
                    <img 
                        src={"/img/food/" + hovering.img} 
                        className={style.ms_order_button_img}/>
                </div>
            </>}
        </div>
    )
}

//order component that shows what the user has ordered
//used both in QuestionLayout and in MenuSelect
const Order = ({order,budget}) => {
    const lang = useWrapperContext().state.lang

    return (
        <div className={style.order_container}>    
            <p className={style.order_text}>Order:</p>
            {order.dishes.entree[lang] ? <p className={style.order_text}>{order.dishes.entree[lang]} - ${order.dishes.entree.price}.00</p> : <></>}
            {order.dishes.drink[lang] ? <p className={style.order_text}>{order.dishes.drink[lang]} - ${order.dishes.drink.price}.00</p> : <></>}
            {order.dishes.desert[lang] ? <p className={style.order_text}>{order.dishes.desert[lang]} - ${order.dishes.desert.price}.00</p> : <></>}
            
            {/* Re-add if you want to show total or keep it hidden
            !budget ? 
            <p>Total - ${order.total}.00</p>
            : 
            order.total <= budget ?<p className="green">Total - ${order.total}.00</p> : <p className="red">Total - ${order.total}.00</p>
            */}
        </div>
    )
}

//The buttons found on MenuSelect
const MenuButton = ({dish, handleEnter, handlerLeave,handleClick}) => {
    return (
        <button className={style.menu_button}
            onMouseEnter={() => handleEnter(dish)}
            onMouseLeave={() => handlerLeave()}
            onClick={() => handleClick()}> 
            <img 
                src={"/img/food/" + dish.img} 
                className={style.ms_order_button_img}/>
        </button>
    )
}