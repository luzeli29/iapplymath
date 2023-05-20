import React from 'react'
import style from '@styles/restaurant.module.css'
import Loading from '@comps/screens/loading';
import { err } from '@utils/debug/devLog';
import getText from '@utils/text/getText'
import { useUserContext } from '@hooks/siteContext/useUserContext';
import menuOptions from "@public/text/menuOptions"

const Menu = ({ menu, handleHover, handleDishClick }) => {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn    
    if(loading) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>
    const lang = settings.lang
   
    if(!menu) return <Loading/>
    
    const MenuButton = ({dishType,dishIndex}) => {
        const dish = menuOptions[dishType][dishIndex]
        return (
            <button className={style.menu_button}
                onMouseEnter={() => handleHover(dish)}
                onMouseLeave={() => handleHover()}
                onClick={() => handleDishClick(dishIndex, dishType)}> 
                <img 
                    src={"/img/food/" + dish.img} 
                    className={style.ms_order_button_img}/>
            </button>
        )
    }
    

    return (
        <div className={style.menu_grid}>
            <p className={style.menu_titles}><strong>{getText('mainDish', lang)}</strong></p>
            <div className={style.five_grid}>
                {menu.mainDish.map((dishIndex) => {
                    return (
                        <MenuButton 
                            dishType={'mainDish'}
                            dishIndex={dishIndex}/>                    
                )})}
            </div>
            <p className={style.menu_titles}><strong>{getText('drink', lang)}</strong></p>
            <div className={style.three_grid}>
                {menu.drink.map((dishIndex) => {
                    return (
                        <MenuButton 
                            dishType={'drink'}
                            dishIndex={dishIndex}/>                      
                )})}
            </div>
            <p className={style.menu_titles}><strong>{getText('dessert', lang)}</strong></p>
            <div className={style.three_grid}>
            {menu.dessert.map((dishIndex) => {
                return (
                    <MenuButton 
                            dishType={'dessert'}
                            dishIndex={dishIndex}/>                        
                )})}
            </div>
        </div>
    )
    
}

export default Menu 
