import style from '../../../styles/restaurant.module.css'

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

export default MenuButton