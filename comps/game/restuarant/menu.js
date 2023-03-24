import React from 'react'
import style from '@styles/restaurant.module.css'
import MenuButton from './menuButton';
import Loading from '@comps/screens/loading';
import { err } from '@utils/debug/log';

const Menu = ({lang, menu, handleHover, handleDishClick}) => {
    if(!lang) {
        lang = "en"
        err('"lang" not defined.')
    }
    if(!menu) return <Loading/>
    
    return (
        <div className={style.menu_grid}>
            <p className={style.menu_titles}><strong>Entrees</strong></p>
            <div className={style.five_grid}>
                {menu.entree.map((dish) => {
                    return (
                        <MenuButton 
                            key={dish.en}
                            dish={dish}
                            handleEnter={(dish) => handleHover(dish)}
                            handlerLeave={() => handleHover("")}
                            handleClick={(dish) => handleDishClick(dish, "entree")}/>                    
                )})}
            </div>
            <p className={style.menu_titles}><strong>Drinks</strong></p>
            <div className={style.three_grid}>
                {menu.drink.map((dish) => {
                    return (
                        <MenuButton 
                            key={dish.en}
                            dish={dish}
                            handleEnter={(dish) => handleHover(dish)}
                            handlerLeave={() => handleHover("")}
                            handleClick={(dish) => handleDishClick(dish, "drink")}/>                    
                )})}
            </div>
            <p className={style.menu_titles}><strong>Dessert</strong></p>
            <div className={style.three_grid}>
            {menu.dessert.map((dish) => {
                return (
                    <MenuButton 
                        key={dish.en}
                        dish={dish}
                        handleEnter={(dish) => handleHover(dish)}
                        handlerLeave={() => handleHover("")}
                        handleClick={(dish) => handleDishClick(dish, "dessert")}/>                    
                )})}
            </div>
        </div>
    )
    
}

export default Menu 
